import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { notFound } from '../lib/errors';
import { validCell } from '../lib/h3';
import { ml } from '../lib/ml';
import { parametersFor } from '../lib/parameters';
import { type Band, trapezoid } from '../lib/fit';
import { type ReportData, renderReport } from '../lib/pdf';
import { params } from '../lib/validate';
import { reportLimiter } from '../middleware/security';
import { errors, registry } from '../openapi';
import { cellProfile } from './cells';

export const reportsRouter = Router();

const Params = z.object({
  h3: z.string().refine(validCell, 'invalid H3 index'),
  species: z
    .string()
    .regex(/^[a-z-]+$/)
    .max(60),
});

registry.registerPath({
  method: 'get',
  path: '/reports/{h3}/{species}',
  tags: ['Reports'],
  summary: 'PDF report: score decomposition, SHAP drivers, environmental values with provenance',
  request: { params: Params },
  responses: {
    200: {
      description: 'PDF document',
      content: { 'application/pdf': { schema: z.string().openapi({ format: 'binary' }) } },
    },
    ...errors(400, 404, 429),
  },
});
reportsRouter.get('/reports/:h3/:species', reportLimiter, async (req, res) => {
  const p = params(req, Params);
  const [profile, sp, meta] = await Promise.all([
    cellProfile(p.h3),
    prisma.species.findUnique({ where: { id: p.species } }),
    prisma.appMeta.findUnique({ where: { key: 'snapshot_version' } }),
  ]);
  if (!profile) throw notFound('Cell');
  if (!sp) throw notFound('Species');
  const stored = profile.scores.find((s) => s.speciesId === sp.id);
  if (!stored)
    throw notFound(`Score of ${sp.scientificName} for this cell (habitat absent from the cell)`);

  const labels = new Map(profile.features.map((f) => [f.feature_key, f.label]));
  const values = Object.fromEntries(profile.features.map((f) => [f.feature_key, f.value]));
  const tolerances = (sp.tolerances as unknown as Record<string, Band> | null) ?? {};

  let score: ReportData['score'];
  let mlPart: ReportData['ml'] = null;
  try {
    const ex = await ml.explain(sp.id, p.h3);
    const sc = ex.score as unknown as Record<string, unknown> & {
      parameters: {
        label: string;
        value: number | null;
        unit: string;
        band: Record<string, number>;
        fit: number | null;
        weight: number;
      }[];
      violations: ReportData['score']['violations'];
      limiting: ReportData['score']['limiting'];
    };
    score = {
      score: sc.score as number,
      category: sc.category as string,
      mode: sc.mode as string,
      confidence: sc.confidence as number,
      expertScore: sc.expert_score as number | null,
      mlScore: sc.ml_score as number | null,
      modifiers: {
        regulatory: sc.regulatory_mod as number,
        human: sc.human_mod as number,
        data: sc.data_mod as number,
      },
      recommendation: sc.recommendation as string,
      limiting: sc.limiting,
      parameters: sc.parameters,
      violations: sc.violations,
      source: 'ml-service',
    };
    if (ex.ml) {
      mlPart = {
        probability: ex.ml.calibrated_probability,
        auc: ex.ml.auc_mean,
        drivers: ex.ml.shap.slice(0, 5).map((d) => ({
          label: labels.get(d.feature) ?? d.feature,
          value: d.value,
          shap: d.shap,
        })),
      };
    }
  } catch {
    // ML service down: rebuild the parameter table from stored data (same trapezoid as the model).
    score = {
      score: stored.score,
      category: stored.category,
      mode: stored.mode,
      confidence: stored.confidence,
      expertScore: stored.expertScore,
      mlScore: stored.mlScore,
      modifiers: { regulatory: stored.regulatoryMod, human: stored.humanMod, data: stored.dataMod },
      recommendation: `Category: ${stored.category}. Limiting factors: ${(stored.limiting as string[][]).map((l) => l[0]).join(', ') || 'none'}.`,
      limiting: (stored.limiting as string[][]).map((l) => ({ parameter: l[0] ?? '', kind: l[1] })),
      parameters: parametersFor(sp.habitat).map((pm) => {
        const band = tolerances[pm.key];
        const value = values[pm.feature] ?? null;
        return {
          label: pm.label,
          value,
          unit: pm.unit,
          band: (band ?? {}) as Record<string, number>,
          fit: band ? trapezoid(value, band) : null,
          weight: pm.weight,
        };
      }),
      violations: [],
      source: 'precomputed',
    };
  }

  const shown = profile.features.filter((f) => f.domain !== 'model');
  const usedSources = new Map(shown.map((f) => [f.provenance_id, f]));
  const provs = await prisma.provenance.findMany({
    where: { id: { in: [...usedSources.keys(), 'gbif', 'obis'] } },
  });

  const data: ReportData = {
    generatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
    species: {
      id: sp.id,
      scientificName: sp.scientificName,
      commonNameEn: sp.commonNameEn,
      habitat: sp.habitat,
    },
    cell: {
      h3: p.h3,
      territory: profile.cell.territoryCode,
      lat: profile.cell.lat,
      lon: profile.cell.lon,
      resolution: profile.cell.resolution,
      landFraction: profile.cell.landFraction,
      seaFraction: profile.cell.seaFraction,
    },
    run: { id: stored.runId, snapshotVersion: meta?.value || null },
    score,
    ml: mlPart,
    features: shown.map((f) => ({
      label: f.label,
      value: f.value,
      unit: f.unit,
      source: f.provenance_name,
      license: f.license,
      retrieved: f.retrieved_at.toISOString().slice(0, 10),
    })),
    sources: provs.map((pv) => ({ name: pv.name, license: pv.license, citation: pv.citation })),
  };

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="biomed-zones_${sp.id}_${p.h3}.pdf"`);
  const doc = renderReport(data);
  doc.pipe(res);
  doc.end();
});
