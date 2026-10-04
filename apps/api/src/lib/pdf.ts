import PDFDocument from 'pdfkit';

const INK = '#0C1116';
const MUTED = '#44505C';
const BRAND = '#0F766E';
const RULE = '#D6D3D1';

export interface ReportData {
  generatedAt: string;
  species: { id: string; scientificName: string; commonNameEn: string | null; habitat: string };
  cell: {
    h3: string;
    territory: string;
    lat: number;
    lon: number;
    resolution: number;
    landFraction: number;
    seaFraction: number;
  };
  run: { id: string | null; snapshotVersion: string | null };
  score: {
    score: number;
    category: string;
    mode: string;
    confidence: number;
    expertScore: number | null;
    mlScore: number | null;
    modifiers: { regulatory: number; human: number; data: number };
    recommendation: string;
    limiting: { parameter: string; kind?: string; detail?: string }[];
    parameters: {
      label: string;
      value: number | null;
      unit: string;
      band: Record<string, number>;
      fit: number | null;
      weight: number;
    }[];
    violations: { feature: string; value: number; limit: number; side: string }[];
    source: 'ml-service' | 'precomputed';
  };
  ml: {
    probability: number;
    auc: number;
    drivers: { label: string; value: number; shap: number }[];
  } | null;
  features: {
    label: string;
    value: number;
    unit: string;
    source: string;
    license: string;
    retrieved: string;
  }[];
  sources: { name: string; license: string; citation: string | null }[];
}

const fmt = (v: number | null | undefined, d = 2) =>
  v === null || v === undefined ? '—' : v.toFixed(d);

/** The built-in PDF fonts use WinAnsi encoding: map the few symbols it lacks. */
export function pdfSafe(text: string): string {
  return text
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/[‐-‒]/g, '-')
    .replace(
      /[^\t\n\u0020-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013\u2014\u2018-\u201e\u2020-\u2022\u2026\u2030\u2039\u203a\u20ac\u2122]/g,
      '?',
    );
}

/** "Copernicus Marine Service Licence (free, attribution required)" → its main name. */
const short = (t: string) => t.split(' (')[0] ?? t;

export function renderReport(data: ReportData): PDFKit.PDFDocument {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 48, bottom: 48, left: 48, right: 48 },
    info: {
      Title: `BioMed Zones report — ${data.species.scientificName} — ${data.cell.h3}`,
      Author: 'BioMed Zones',
      Subject: 'Cultivation suitability report',
    },
  });
  const width = doc.page.width - 96;

  const h2 = (t: string) => {
    doc
      .moveDown(0.8)
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor(BRAND)
      .text(t.toUpperCase(), { characterSpacing: 0.5 });
    doc
      .moveTo(48, doc.y + 2)
      .lineTo(48 + width, doc.y + 2)
      .strokeColor(RULE)
      .lineWidth(0.5)
      .stroke();
    doc.moveDown(0.4).font('Helvetica').fontSize(9).fillColor(INK);
  };
  const row = (cols: string[], widths: number[], bold = false) => {
    const y = doc.y;
    let x = 48;
    doc
      .font(bold ? 'Helvetica-Bold' : 'Helvetica')
      .fontSize(8.5)
      .fillColor(bold ? MUTED : INK);
    let maxH = 0;
    cols.forEach((raw, i) => {
      const c = pdfSafe(raw);
      const w = widths[i] ?? 80;
      const h = doc.heightOfString(c, { width: w - 4 });
      doc.text(c, x, y, { width: w - 4 });
      maxH = Math.max(maxH, h);
      x += w;
    });
    doc.x = 48;
    doc.y = y + maxH + 3;
    if (doc.y > doc.page.height - 70) doc.addPage();
  };

  // Header
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(BRAND)
    .text('BIOMED ZONES — CULTIVATION SUITABILITY REPORT');
  doc
    .moveDown(0.3)
    .font('Helvetica-BoldOblique')
    .fontSize(18)
    .fillColor(INK)
    .text(data.species.scientificName, { continued: Boolean(data.species.commonNameEn) });
  if (data.species.commonNameEn)
    doc.font('Helvetica').fontSize(12).fillColor(MUTED).text(`  ${data.species.commonNameEn}`);
  doc
    .moveDown(0.2)
    .font('Helvetica')
    .fontSize(9)
    .fillColor(MUTED)
    .text(
      `H3 cell ${data.cell.h3} (resolution ${data.cell.resolution}) · ${data.cell.territory} · ` +
        `${data.cell.lat.toFixed(4)}°, ${data.cell.lon.toFixed(4)}° · land ${(data.cell.landFraction * 100).toFixed(0)} % / sea ${(data.cell.seaFraction * 100).toFixed(0)} %`,
    );
  doc.text(
    `Generated ${data.generatedAt} · model run ${data.run.id ?? 'n/a'} · data snapshot ${data.run.snapshotVersion ?? 'live'}`,
  );

  // Score
  h2('Score');
  const s = data.score;
  // Big number and its label are placed explicitly: mixing font sizes on one "continued" line
  // misplaces the cursor in pdfkit.
  const top = doc.y;
  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .fillColor(INK)
    .text(s.score.toFixed(0), 48, top, { lineBreak: false });
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(MUTED)
    .text(
      `/ 100   ·   ${s.mode === 'open' ? s.category : s.mode.replace('_', ' ')}   ·   confidence ${fmt(s.confidence)}`,
      100,
      top + 12,
    );
  doc.x = 48;
  doc.y = top + 38;
  doc
    .font('Courier')
    .fontSize(8.5)
    .fillColor(INK)
    .text(
      `final = blend(expert ${fmt(s.expertScore, 1)}, ml ${fmt(s.mlScore, 1)}) × regulatory ${fmt(s.modifiers.regulatory)} × human ${fmt(s.modifiers.human)} × data ${fmt(s.modifiers.data)}`,
    );
  doc
    .moveDown(0.4)
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(INK)
    .text(pdfSafe(s.recommendation), { width });
  if (s.source === 'precomputed') {
    doc
      .moveDown(0.3)
      .fontSize(8)
      .fillColor(MUTED)
      .text('ML service unavailable: values are the precomputed scores of the active run.');
  }

  // Expert parameters
  h2('Expert score — parameters');
  const pw = [130, 70, 50, 140, 60, 50];
  row(['Parameter', 'Value', 'Unit', 'Optimal band (tolerance)', 'Fit / 100', 'Weight'], pw, true);
  for (const p of s.parameters) {
    row(
      [
        p.label,
        fmt(p.value),
        p.unit,
        `${p.band.opt_min}–${p.band.opt_max} (${p.band.min}–${p.band.max})`,
        fmt(p.fit, 0),
        p.weight.toFixed(2),
      ],
      pw,
    );
  }
  if (s.violations.length) {
    doc
      .moveDown(0.3)
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor('#B45309')
      .text('Survival limits violated (score capped):');
    for (const v of s.violations) {
      doc
        .font('Helvetica')
        .fillColor(INK)
        .text(`• ${v.feature} = ${v.value.toFixed(2)} is ${v.side} the limit ${v.limit}`);
    }
  }
  if (s.limiting.length) {
    doc
      .moveDown(0.3)
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor(INK)
      .text('Main limiting factors');
    for (const l of s.limiting) doc.font('Helvetica').text(pdfSafe(`• ${l.detail ?? l.parameter}`));
  }

  // ML
  h2('Species distribution model');
  if (data.ml) {
    doc.text(
      `Calibrated suitability ${fmt(data.ml.probability)} · spatial-CV AUC ${fmt(data.ml.auc, 3)}. Top SHAP drivers (log-odds):`,
    );
    const dw = [220, 90, 90];
    row(['Predictor', 'Value', 'SHAP'], dw, true);
    for (const d of data.ml.drivers)
      row([d.label, fmt(d.value), `${d.shap >= 0 ? '+' : ''}${d.shap.toFixed(3)}`], dw);
  } else {
    doc.text(
      'No distribution model for this species (too few occurrence records) or ML service unavailable; the score relies on the expert bands.',
    );
  }

  // Environment
  h2('Environmental data (cell values and provenance)');
  const fw = [170, 55, 55, 125, 94];
  row(['Variable', 'Value', 'Unit', 'Source', 'Licence · retrieved'], fw, true);
  for (const f of data.features)
    row(
      [f.label, fmt(f.value), f.unit, short(f.source), `${short(f.license)} · ${f.retrieved}`],
      fw,
    );

  h2('Sources');
  for (const src of data.sources) {
    doc
      .font('Helvetica-Bold')
      .fontSize(8)
      .fillColor(INK)
      .text(pdfSafe(src.name), { continued: true });
    doc
      .font('Helvetica')
      .fillColor(MUTED)
      .text(pdfSafe(` — ${src.license}${src.citation ? `. ${src.citation}` : ''}`), { width });
  }

  h2('Disclaimer');
  doc
    .fontSize(8)
    .fillColor(MUTED)
    .text(
      'Screening output of a hybrid expert + species-distribution model. Scores express relative environmental ' +
        'suitability, not yield or legal permission. Tolerance bands are literature-derived approximations awaiting ' +
        'expert validation. Protected-area rules must be checked with the managing authority. See the model card ' +
        '(docs/MODEL_CARD.md) for metrics, limits and biases.',
      { width },
    );
  return doc;
}
