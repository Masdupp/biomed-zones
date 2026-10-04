"""The nine species in scope (identity only; descriptive data lives in the API seed)."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Species:
    id: str
    scientific_name: str
    habitat: str  # marine | freshwater | terrestrial
    gbif_kingdom: str


SPECIES: tuple[Species, ...] = (
    Species("arenicola-marina", "Arenicola marina", "marine", "Animalia"),
    Species("conus-magus", "Conus magus", "marine", "Animalia"),
    Species("limulus-polyphemus", "Limulus polyphemus", "marine", "Animalia"),
    Species("holothuria-tubulosa", "Holothuria tubulosa", "marine", "Animalia"),
    Species("danio-rerio", "Danio rerio", "freshwater", "Animalia"),
    Species("ambystoma-mexicanum", "Ambystoma mexicanum", "freshwater", "Animalia"),
    Species("catharanthus-roseus", "Catharanthus roseus", "terrestrial", "Plantae"),
    Species("salix-alba", "Salix alba", "terrestrial", "Plantae"),
    Species("ginkgo-biloba", "Ginkgo biloba", "terrestrial", "Plantae"),
)

BY_ID = {s.id: s for s in SPECIES}
