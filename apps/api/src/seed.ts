/**
 * Idempotent seed: species profiles (data/reference/species.json), demo accounts and ~20 example
 * contributions. Examples are flagged `isExample`, titled "[Example] …" and never used for model
 * training; their references are the species' verified literature, cited as context only.
 */
import fs from 'node:fs';
import type { ContributionStatus, ContributionType, Prisma } from '@prisma/client';
import { config } from './config';
import { hashPassword } from './lib/auth';
import { prisma } from './lib/db';
import { toCell } from './lib/h3';
import { logger } from './lib/logger';

export const DEMO_ACCOUNTS = {
  admin: {
    email: 'admin@biomed-zones.local',
    password: 'BioMedAdmin!2026',
    displayName: 'Demo Administrator',
  },
  contributor: {
    email: 'contributor@biomed-zones.local',
    password: 'BioMedContrib!2026',
    displayName: 'Demo Contributor',
  },
};

interface ProfileFile {
  generated_at: string;
  species: Record<string, unknown>[];
  references: Record<string, Record<string, unknown>>;
}

async function seedSpecies(file: ProfileFile) {
  for (const s of file.species) {
    const refKeys = new Set<string>([
      ...((s.medical_applications as { references: string[] }[]) ?? []).flatMap(
        (m) => m.references,
      ),
      ...((s.tolerance_references as string[]) ?? []),
    ]);
    const data = {
      scientificName: s.scientific_name as string,
      habitat: s.habitat as string,
      gbifTaxonKey: (s.gbif_taxon_key as number) ?? null,
      commonNameEn: (s.common_name_en as string) ?? null,
      commonNameFr: (s.common_name_fr as string) ?? null,
      authorship: (s.authorship as string) ?? null,
      taxonomy: s.taxonomy as Prisma.InputJsonValue,
      iucn: s.iucn as Prisma.InputJsonValue,
      medicalApplications: s.medical_applications as Prisma.InputJsonValue,
      tolerances: s.tolerances as Prisma.InputJsonValue,
      toleranceNote: (s.tolerance_note as string) ?? null,
      toleranceReferences: (s.tolerance_references as string[]) ?? [],
      cultivationDifficulty: (s.cultivation_difficulty as string) ?? null,
      cultivationNote: (s.cultivation_note as string) ?? null,
      nativeTerritories: (s.native_territories as string[]) ?? [],
      nativeNote: (s.native_note as string) ?? null,
      frostSensitive: Boolean(s.frost_sensitive),
      references: Object.fromEntries(
        [...refKeys].map((k) => [k, file.references[k] ?? { key: k, status: 'to verify' }]),
      ) as Prisma.InputJsonValue,
      photo: (s.photo as Prisma.InputJsonValue) ?? undefined,
      profileUpdatedAt: new Date(file.generated_at),
    };
    await prisma.species.upsert({
      where: { id: s.id as string },
      create: { id: s.id as string, ...data },
      update: data,
    });
  }
  return file.species.length;
}

async function seedUser(kind: keyof typeof DEMO_ACCOUNTS, role: 'ADMIN' | 'CONTRIBUTOR') {
  const a = DEMO_ACCOUNTS[kind];
  const existing = await prisma.user.findUnique({ where: { email: a.email } });
  if (existing) return existing;
  return prisma.user.create({
    data: {
      email: a.email,
      displayName: a.displayName,
      role,
      passwordHash: await hashPassword(a.password),
    },
  });
}

interface Example {
  species: string;
  type: ContributionType;
  status: ContributionStatus;
  title: string;
  place: string;
  lat: number;
  lon: number;
  date: string;
  outcome: string;
  measurements?: Record<string, { value: number; unit: string }>;
  description: string;
  review?: string;
}

const EXAMPLES: Example[] = [
  {
    species: 'arenicola-marina',
    type: 'FIELD_OBSERVATION',
    status: 'APPROVED',
    title: 'Lugworm casts on the intertidal flats',
    place: 'Baie du Mont-Saint-Michel',
    lat: 48.66,
    lon: -1.62,
    date: '2025-04-18',
    outcome: 'presence',
    measurements: {
      cast_density: { value: 42, unit: 'casts/m²' },
      sediment_median: { value: 0.18, unit: 'mm' },
    },
    description:
      'Dense lugworm casts counted on three 1 m² quadrats at mid-tide level during a spring low tide.',
    review: 'Consistent with the intertidal habitat and the expert score.',
  },
  {
    species: 'arenicola-marina',
    type: 'FIELD_OBSERVATION',
    status: 'APPROVED',
    title: 'Lugworms on sandy flats of the lagoon',
    place: "Bassin d'Arcachon",
    lat: 44.68,
    lon: -1.17,
    date: '2025-06-02',
    outcome: 'presence',
    measurements: { cast_density: { value: 18, unit: 'casts/m²' } },
    description:
      'Moderate cast densities on muddy-sand flats near the lagoon entrance, upper intertidal zone.',
    review: 'Approved.',
  },
  {
    species: 'arenicola-marina',
    type: 'CULTIVATION_TRIAL',
    status: 'PENDING',
    title: 'Pilot lugworm culture beds in a former oyster park',
    place: 'Baie de Morlaix',
    lat: 48.65,
    lon: -3.85,
    date: '2025-09-10',
    outcome: 'success',
    measurements: {
      survival_rate: { value: 71, unit: '%' },
      growth: { value: 2.1, unit: 'g/month' },
    },
    description:
      'Six-month trial of juvenile lugworms seeded into sediment beds; survival and growth monitored monthly.',
  },
  {
    species: 'holothuria-tubulosa',
    type: 'FIELD_OBSERVATION',
    status: 'APPROVED',
    title: 'Sea cucumbers on Posidonia meadow edges',
    place: 'Golfe de Marseille',
    lat: 43.21,
    lon: 5.33,
    date: '2025-07-21',
    outcome: 'presence',
    measurements: { density: { value: 1.4, unit: 'ind/m²' }, depth: { value: 8, unit: 'm' } },
    description: 'Belt transects by scuba along the edge of a Posidonia meadow at 6–10 m depth.',
    review: 'Matches known Mediterranean distribution.',
  },
  {
    species: 'holothuria-tubulosa',
    type: 'CULTIVATION_TRIAL',
    status: 'PENDING',
    title: 'Co-culture under fish cages',
    place: "Golfe d'Ajaccio",
    lat: 41.9,
    lon: 8.7,
    date: '2025-08-30',
    outcome: 'partial',
    measurements: { survival_rate: { value: 54, unit: '%' } },
    description:
      'Juveniles placed in pens below a sea-bream cage; partial survival attributed to summer temperature peaks.',
  },
  {
    species: 'holothuria-tubulosa',
    type: 'FIELD_OBSERVATION',
    status: 'APPROVED',
    title: 'No individuals found during winter survey',
    place: 'Rade de Brest',
    lat: 48.35,
    lon: -4.5,
    date: '2025-02-11',
    outcome: 'absence',
    measurements: { water_temperature: { value: 9.5, unit: '°C' } },
    description:
      'Systematic dive survey of soft bottoms; no H. tubulosa observed. Winter water below the species’ survival limit.',
    review: 'Absence consistent with the cold-water hard constraint.',
  },
  {
    species: 'holothuria-tubulosa',
    type: 'FIELD_OBSERVATION',
    status: 'DRAFT',
    title: 'Observation near the marine reserve',
    place: 'Banyuls-sur-Mer',
    lat: 42.48,
    lon: 3.13,
    date: '2025-05-14',
    outcome: 'presence',
    description: 'Draft notes from a snorkelling survey; photographs still to be attached.',
  },
  {
    species: 'conus-magus',
    type: 'FIELD_OBSERVATION',
    status: 'PENDING',
    title: 'Cone snail on lagoon reef flat',
    place: 'Lagon de Mayotte',
    lat: -12.85,
    lon: 45.2,
    date: '2025-10-05',
    outcome: 'presence',
    description:
      'Single live specimen photographed on a reef flat at low tide; identification to be confirmed by a malacologist.',
  },
  {
    species: 'conus-magus',
    type: 'CULTIVATION_TRIAL',
    status: 'REJECTED',
    title: 'Proposed open-sea grow-out cages',
    place: 'Grand Cul-de-Sac Marin',
    lat: 16.3,
    lon: -61.55,
    date: '2025-03-20',
    outcome: 'failure',
    description: 'Proposal to grow cone snails in open-sea cages.',
    review:
      'Rejected: Conus magus is not native to the Caribbean; open-water culture would be an introduction.',
  },
  {
    species: 'limulus-polyphemus',
    type: 'FIELD_OBSERVATION',
    status: 'REJECTED',
    title: 'Horseshoe crab on the beach',
    place: 'Golfe de Gascogne',
    lat: 43.48,
    lon: -1.56,
    date: '2025-07-02',
    outcome: 'presence',
    description: 'Report of a horseshoe crab carapace on the beach.',
    review:
      'Rejected: Limulus polyphemus is not established in Europe; probably a released or transported specimen.',
  },
  {
    species: 'catharanthus-roseus',
    type: 'CULTIVATION_TRIAL',
    status: 'APPROVED',
    title: 'Open-field periwinkle plots',
    place: 'Saint-Paul, La Réunion',
    lat: -21.0,
    lon: 55.3,
    date: '2025-05-30',
    outcome: 'success',
    measurements: { yield_dry_leaves: { value: 2.8, unit: 't/ha' } },
    description: 'Two-season trial of rain-fed Catharanthus plots on the leeward coast.',
    review: 'Consistent with model (high suitability, no frost).',
  },
  {
    species: 'catharanthus-roseus',
    type: 'CULTIVATION_TRIAL',
    status: 'APPROVED',
    title: 'Outdoor plots lost to winter frost',
    place: 'Lyon',
    lat: 45.75,
    lon: 4.85,
    date: '2025-01-15',
    outcome: 'failure',
    measurements: { frost_days: { value: 23, unit: 'days' } },
    description: 'Plants left outdoors after October died during the first frosts.',
    review: 'Confirms the frost hard constraint.',
  },
  {
    species: 'catharanthus-roseus',
    type: 'FIELD_OBSERVATION',
    status: 'PENDING',
    title: 'Naturalised periwinkle on coastal dunes',
    place: 'Sainte-Anne, Martinique',
    lat: 14.43,
    lon: -60.88,
    date: '2025-09-12',
    outcome: 'presence',
    description: 'Flowering plants along a coastal path, apparently naturalised.',
  },
  {
    species: 'salix-alba',
    type: 'FIELD_OBSERVATION',
    status: 'APPROVED',
    title: 'Riparian white willows',
    place: 'Loire near Tours',
    lat: 47.39,
    lon: 0.69,
    date: '2025-06-24',
    outcome: 'presence',
    description: 'Mature white willows forming a continuous riparian belt along the river.',
    review: 'Approved.',
  },
  {
    species: 'salix-alba',
    type: 'CULTIVATION_TRIAL',
    status: 'PENDING',
    title: 'Short-rotation willow coppice for bark',
    place: 'Camargue',
    lat: 43.55,
    lon: 4.6,
    date: '2025-08-01',
    outcome: 'success',
    measurements: { survival_rate: { value: 88, unit: '%' } },
    description:
      'Cuttings planted on irrigated plots; bark harvest planned after the second winter.',
  },
  {
    species: 'salix-alba',
    type: 'FIELD_OBSERVATION',
    status: 'DRAFT',
    title: 'Willows along the Rhine',
    place: 'Rhin, Alsace',
    lat: 48.45,
    lon: 7.72,
    date: '2025-04-03',
    outcome: 'presence',
    description: 'Draft: list of observation points along the dyke to be completed.',
  },
  {
    species: 'ginkgo-biloba',
    type: 'CULTIVATION_TRIAL',
    status: 'APPROVED',
    title: 'Leaf plantation for extract production',
    place: 'Bordeaux area',
    lat: 44.84,
    lon: -0.58,
    date: '2025-10-01',
    outcome: 'success',
    measurements: { leaf_yield: { value: 4.5, unit: 't/ha' } },
    description: 'Hedge-trained ginkgo plantation harvested mechanically in late summer.',
    review: 'Approved.',
  },
  {
    species: 'ginkgo-biloba',
    type: 'CULTIVATION_TRIAL',
    status: 'PENDING',
    title: 'Ginkgo saplings in a humid tropical climate',
    place: 'Cayenne',
    lat: 4.93,
    lon: -52.33,
    date: '2025-07-15',
    outcome: 'partial',
    description: 'Saplings survive but grow slowly; leaf scorch during the dry season.',
  },
  {
    species: 'danio-rerio',
    type: 'CULTIVATION_TRIAL',
    status: 'APPROVED',
    title: 'Recirculating indoor zebrafish facility',
    place: 'Montpellier',
    lat: 43.61,
    lon: 3.88,
    date: '2025-03-01',
    outcome: 'success',
    measurements: { water_temperature: { value: 28, unit: '°C' } },
    description: 'Indoor recirculating aquaculture system at 28 °C; no outdoor component.',
    review: 'Approved as an indoor-only case, consistent with the model’s honesty rule.',
  },
  {
    species: 'ambystoma-mexicanum',
    type: 'CULTIVATION_TRIAL',
    status: 'PENDING',
    title: 'Laboratory axolotl colony',
    place: 'Grenoble',
    lat: 45.19,
    lon: 5.72,
    date: '2025-06-10',
    outcome: 'success',
    measurements: { water_temperature: { value: 17, unit: '°C' } },
    description: 'Indoor colony kept at 16–18 °C in chilled tanks; breeding successful.',
  },
];

async function seedExamples(contributorId: string, adminId: string, file: ProfileFile) {
  let n = 0;
  for (const [i, e] of EXAMPLES.entries()) {
    const id = `example-${String(i + 1).padStart(2, '0')}-${e.species}`;
    const species = file.species.find((s) => s.id === e.species);
    const refKeys =
      ((species?.medical_applications as { references: string[] }[]) ?? [])[0]?.references.slice(
        0,
        1,
      ) ?? [];
    const references = refKeys.map((k) => {
      const r = file.references[k] ?? {};
      return {
        doi: r.doi,
        url: r.url,
        citation: r.title ?? k,
        status: r.status ?? 'unverified',
        role: 'context (example data)',
      };
    });
    const reviewed = e.status === 'APPROVED' || e.status === 'REJECTED';
    const data = {
      authorId: contributorId,
      speciesId: e.species,
      type: e.type,
      status: e.status,
      title: `[Example] ${e.title} — ${e.place}`,
      description: `${e.description}\n\nExample data generated for the demo; not a real observation.`,
      lat: e.lat,
      lon: e.lon,
      h3: toCell(e.lat, e.lon),
      observedAt: new Date(e.date),
      outcome: e.outcome,
      measurements: (e.measurements ?? {}) as Prisma.InputJsonValue,
      references: references as Prisma.InputJsonValue,
      isExample: true,
      submittedAt: e.status === 'DRAFT' ? null : new Date(e.date),
      reviewerId: reviewed ? adminId : null,
      reviewComment: reviewed ? (e.review ?? null) : null,
      reviewedAt: reviewed ? new Date(new Date(e.date).getTime() + 7 * 86_400_000) : null,
    };
    await prisma.contribution.upsert({ where: { id }, create: { id, ...data }, update: data });
    n++;
  }
  return n;
}

export async function seed() {
  const file = JSON.parse(fs.readFileSync(config.SPECIES_PROFILES, 'utf8')) as ProfileFile;
  const species = await seedSpecies(file);
  const admin = await seedUser('admin', 'ADMIN');
  const contributor = await seedUser('contributor', 'CONTRIBUTOR');
  const examples = await seedExamples(contributor.id, admin.id, file);
  logger.info({ species, examples }, 'seed complete');
}

if (require.main === module) {
  seed()
    .catch((err) => {
      logger.error({ err }, 'seed failed');
      process.exitCode = 1;
    })
    .finally(() => void prisma.$disconnect());
}
