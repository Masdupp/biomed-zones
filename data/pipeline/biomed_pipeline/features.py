"""Feature dictionary: every environmental variable stored per H3 cell."""

from dataclasses import dataclass


@dataclass(frozen=True)
class FeatureDef:
    key: str
    label: str
    unit: str
    domain: str  # marine | terrestrial | pressure | regulatory
    description: str
    source: str  # source module (clean/<source>/)


FEATURES: tuple[FeatureDef, ...] = (
    # Marine — Copernicus Marine 2021-2025 climatology
    FeatureDef(
        "sst_mean",
        "Sea surface temperature (mean)",
        "°C",
        "marine",
        "Mean of the 12 monthly climatological surface temperatures, 2021-2025.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sst_min",
        "Sea surface temperature (coldest month)",
        "°C",
        "marine",
        "Lowest monthly climatological surface temperature.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sst_max",
        "Sea surface temperature (warmest month)",
        "°C",
        "marine",
        "Highest monthly climatological surface temperature.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sbt_mean",
        "Sea bottom temperature (mean)",
        "°C",
        "marine",
        "Model bottom temperature, annual mean of the climatology.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sbt_min",
        "Sea bottom temperature (coldest month)",
        "°C",
        "marine",
        "Lowest monthly climatological bottom temperature.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sbt_max",
        "Sea bottom temperature (warmest month)",
        "°C",
        "marine",
        "Highest monthly climatological bottom temperature.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sss_mean",
        "Sea surface salinity (mean)",
        "PSU",
        "marine",
        "Mean surface practical salinity.",
        "copernicus_marine",
    ),
    FeatureDef(
        "sss_min",
        "Sea surface salinity (lowest month)",
        "PSU",
        "marine",
        "Lowest monthly climatological surface salinity.",
        "copernicus_marine",
    ),
    FeatureDef(
        "o2_mean",
        "Dissolved oxygen (mean)",
        "mmol/m³",
        "marine",
        "Mean surface dissolved oxygen concentration.",
        "copernicus_marine",
    ),
    FeatureDef(
        "o2_min",
        "Dissolved oxygen (lowest month)",
        "mmol/m³",
        "marine",
        "Lowest monthly climatological surface dissolved oxygen.",
        "copernicus_marine",
    ),
    FeatureDef(
        "ph_mean",
        "Seawater pH (mean)",
        "pH",
        "marine",
        "Mean surface pH (total scale).",
        "copernicus_marine",
    ),
    FeatureDef(
        "chl_mean",
        "Chlorophyll-a (mean)",
        "mg/m³",
        "marine",
        "Mean surface chlorophyll-a concentration.",
        "copernicus_marine",
    ),
    FeatureDef(
        "depth_mean",
        "Depth (mean)",
        "m",
        "marine",
        "Mean depth below the vertical datum (LAT for EMODnet); negative = intertidal flats.",
        "bathymetry",
    ),
    FeatureDef(
        "shallow_frac",
        "Shallow-water share (0-20 m)",
        "fraction",
        "marine",
        "Share of marine-zone pixels with 0 < depth <= 20 m.",
        "bathymetry",
    ),
    FeatureDef(
        "intertidal_frac",
        "Intertidal share",
        "fraction",
        "marine",
        "Share of marine-zone pixels at or above the vertical datum (exposed at low tide).",
        "bathymetry",
    ),
    # Terrestrial
    FeatureDef(
        "tair_mean",
        "Air temperature (mean)",
        "°C",
        "terrestrial",
        "Mean of (Tmax + Tmin) / 2, 2021-2025.",
        "terraclimate",
    ),
    FeatureDef(
        "tair_min",
        "Air temperature (coldest-month minimum)",
        "°C",
        "terrestrial",
        "Mean daily minimum of the coldest climatological month.",
        "terraclimate",
    ),
    FeatureDef(
        "tair_max",
        "Air temperature (warmest-month maximum)",
        "°C",
        "terrestrial",
        "Mean daily maximum of the warmest climatological month.",
        "terraclimate",
    ),
    FeatureDef(
        "precip_annual",
        "Annual precipitation",
        "mm",
        "terrestrial",
        "Mean annual precipitation total, 2021-2025.",
        "terraclimate",
    ),
    FeatureDef(
        "rh_mean",
        "Relative humidity (mean)",
        "%",
        "terrestrial",
        "From vapour pressure and saturation pressure at mean temperature.",
        "terraclimate",
    ),
    FeatureDef(
        "frost_days",
        "Frost days (cold season)",
        "days",
        "terrestrial",
        "Days with daily minimum below 0 °C in the 2024-25 cold season (ERA5-Land).",
        "openmeteo",
    ),
    FeatureDef(
        "elev_mean",
        "Elevation (mean)",
        "m",
        "terrestrial",
        "Mean elevation above sea level.",
        "copernicus_dem",
    ),
    FeatureDef(
        "elev_std",
        "Elevation (standard deviation)",
        "m",
        "terrestrial",
        "Within-cell elevation variability (terrain ruggedness proxy).",
        "copernicus_dem",
    ),
    FeatureDef(
        "soil_ph",
        "Soil pH (0-30 cm)",
        "pH",
        "terrestrial",
        "Topsoil pH in water, thickness-weighted 0-30 cm.",
        "soilgrids",
    ),
    FeatureDef(
        "soil_soc",
        "Soil organic carbon (0-30 cm)",
        "g/kg",
        "terrestrial",
        "Topsoil organic carbon content.",
        "soilgrids",
    ),
    FeatureDef(
        "soil_clay", "Clay (0-30 cm)", "%", "terrestrial", "Topsoil clay fraction.", "soilgrids"
    ),
    FeatureDef(
        "soil_sand", "Sand (0-30 cm)", "%", "terrestrial", "Topsoil sand fraction.", "soilgrids"
    ),
    FeatureDef(
        "soil_silt", "Silt (0-30 cm)", "%", "terrestrial", "Topsoil silt fraction.", "soilgrids"
    ),
    # Human pressure
    FeatureDef(
        "artificial_frac",
        "Artificial surfaces",
        "fraction",
        "pressure",
        "Share of land classified as artificial (CLC 1xx).",
        "landcover",
    ),
    FeatureDef(
        "agri_frac",
        "Agricultural land",
        "fraction",
        "pressure",
        "Share of land classified as agricultural (CLC 2xx).",
        "landcover",
    ),
    FeatureDef(
        "natural_frac",
        "Natural and semi-natural land",
        "fraction",
        "pressure",
        "Share of land classified as forest, semi-natural or wetland (CLC 3xx-4xx).",
        "landcover",
    ),
    FeatureDef(
        "dist_port_km",
        "Distance to nearest port",
        "km",
        "pressure",
        "Great-circle distance from the cell centre to the nearest WPI port.",
        "pressure",
    ),
    FeatureDef(
        "dist_town_km",
        "Distance to nearest town (≥ 20,000 inh.)",
        "km",
        "pressure",
        "Great-circle distance to the nearest populated place of 20,000+.",
        "pressure",
    ),
    # Regulatory
    FeatureDef(
        "n2k_frac",
        "Natura 2000 coverage",
        "fraction",
        "regulatory",
        "Share of the cell inside a Natura 2000 site (SIC or ZPS).",
        "protected_areas",
    ),
    FeatureDef(
        "pn_core_frac",
        "National park core coverage",
        "fraction",
        "regulatory",
        "Share of the cell inside a national park core zone.",
        "protected_areas",
    ),
    FeatureDef(
        "pnm_frac",
        "Marine natural park coverage",
        "fraction",
        "regulatory",
        "Share of the cell inside a marine natural park.",
        "protected_areas",
    ),
    FeatureDef(
        "strict_frac",
        "Strict protection coverage",
        "fraction",
        "regulatory",
        "Integral reserves, national/Corsican nature reserves, biotope orders.",
        "protected_areas",
    ),
    FeatureDef(
        "protected_frac",
        "Any protection coverage",
        "fraction",
        "regulatory",
        "Share of the cell under any of the protections above.",
        "protected_areas",
    ),
)

BY_KEY = {f.key: f for f in FEATURES}
SOURCES = tuple(dict.fromkeys(f.source for f in FEATURES))
