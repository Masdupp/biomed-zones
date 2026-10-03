/**
 * The nine species in scope. Static identity only (names, habitat); every attribute shown
 * in the UI beyond this list comes from the API (Phase 4).
 */
export type Habitat = 'marine' | 'freshwater' | 'terrestrial';

export interface SpeciesIdentity {
  slug: string;
  scientificName: string;
  habitat: Habitat;
}

export const SPECIES: SpeciesIdentity[] = [
  { slug: 'arenicola-marina', scientificName: 'Arenicola marina', habitat: 'marine' },
  { slug: 'conus-magus', scientificName: 'Conus magus', habitat: 'marine' },
  { slug: 'limulus-polyphemus', scientificName: 'Limulus polyphemus', habitat: 'marine' },
  { slug: 'holothuria-tubulosa', scientificName: 'Holothuria tubulosa', habitat: 'marine' },
  { slug: 'danio-rerio', scientificName: 'Danio rerio', habitat: 'freshwater' },
  { slug: 'ambystoma-mexicanum', scientificName: 'Ambystoma mexicanum', habitat: 'freshwater' },
  { slug: 'catharanthus-roseus', scientificName: 'Catharanthus roseus', habitat: 'terrestrial' },
  { slug: 'salix-alba', scientificName: 'Salix alba', habitat: 'terrestrial' },
  { slug: 'ginkgo-biloba', scientificName: 'Ginkgo biloba', habitat: 'terrestrial' },
];
