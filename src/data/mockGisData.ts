/**
 * Enhanced GIS data for AgriUrban Intelligence - Bale Robe & Legacy Support
 */

export interface KebeleData {
  id: string;
  name: string;
  population: number;
  suitabilityScore: number;
  mainCrop: string;
  waterAccess: string;
  floodRiskLevel: string;
  droughtRiskLevel: string;
  landslideHazard: string;
  heatwaveExposure: string;
  soilErosion: string;
  agriSuitabilityScore: number;
  urbanGrowthPotential: number;
  // Backward compatibility fields
  agriculturalPotential: number;
  investmentScore: number;
  suitability: string;
  coordinates: [number, number];
  landCover: {
    builtUp: number;
    cropLand: number;
    vegetation: number;
    water: number;
    bare: number;
  };
  suitability_summary: string;
  population_estimates: string;
  land_cover_distribution: string;
  recommendations: string[];
}

export interface KebeleProperties {
  id: string;
  name: string;
  population_estimates: number;
  land_cover_distribution: {
    builtUp: number;
    cropLand: number;
    vegetation: number;
    water: number;
    bare: number;
  };
  suitability_summary: string;
  suitability_level: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Very Low';
  suitability_score: number;
  agri_suitability: number;
  urban_growth_potential: number;
  flood_risk: 'High' | 'Moderate' | 'Low';
  drought_risk: 'High' | 'Moderate' | 'Low';
  recommendation: string;
}

export const suitabilityColors: Record<string, string> = {
  'Very High': '#059669',
  'High': '#10b981',
  'Moderate': '#f59e0b',
  'Low': '#f97316',
  'Very Low': '#ef4444'
};

export const KEBELE_NAMES = [
  'Araddaa Miccaa', 'Baha Biiftuu', 'Bolee Tokkummaa', 'Caffee Donsaa', 
  'Coffee Horaa Fincaa’aa Bamoo', 'Handhuraa Roobee', 'Hawushhoo', 
  'Horaa Booqaa', 'Kibxaatee', 'Odaa Bahaa', 'Odaa Roobee', 
  'Walta’i Caffee', 'Walta’i Tooshaa'
];

const BASE_LAT = 7.127;
const BASE_LNG = 39.991;

export const generateKebeleData = () => {
  return KEBELE_NAMES.map((name, index) => {
    const lat = BASE_LAT + (Math.random() - 0.5) * 0.05;
    const lng = BASE_LNG + (Math.random() - 0.5) * 0.05;
    const score = Math.floor(Math.random() * 40) + 60;
    
    let level: KebeleProperties['suitability_level'] = 'Moderate';
    if (score > 90) level = 'Very High';
    else if (score > 80) level = 'High';
    else if (score > 70) level = 'Moderate';
    else if (score > 60) level = 'Low';
    else level = 'Very Low';

    const pop = Math.floor(Math.random() * 15000) + 5000;
    const landCover = {
      builtUp: Math.floor(Math.random() * 40),
      cropLand: Math.floor(Math.random() * 40),
      vegetation: Math.floor(Math.random() * 20),
      water: Math.floor(Math.random() * 5),
      bare: Math.floor(Math.random() * 10),
    };

    const floodRisk = Math.random() > 0.7 ? 'High' : (Math.random() > 0.4 ? 'Moderate' : 'Low');
    const droughtRisk = Math.random() > 0.8 ? 'High' : (Math.random() > 0.5 ? 'Moderate' : 'Low');

    const agriScore = Math.floor(Math.random() * 100);
    const urbanScore = Math.floor(Math.random() * 100);

    return {
      type: "Feature",
      properties: {
        id: `keb-${index}`,
        name,
        population: pop,
        population_estimates: `${pop.toLocaleString()} residents (Estimated)`,
        landCover,
        land_cover_distribution: `Dominated by ${landCover.builtUp > landCover.cropLand ? 'built-up areas' : 'croplands'} with significant vegetation coverage.`,
        suitability_summary: `The area shows ${level.toLowerCase()} potential for integrated urban-agriculture development with a score of ${score}/100.`,
        suitabilityScore: score,
        agriSuitabilityScore: agriScore,
        urbanGrowthPotential: urbanScore,
        // Aliases
        agriculturalPotential: agriScore,
        investmentScore: urbanScore,
        suitability: level.toLowerCase(),
        floodRiskLevel: floodRisk,
        droughtRiskLevel: droughtRisk,
        landslideHazard: 'Low',
        heatwaveExposure: 'High',
        soilErosion: 'Low',
        mainCrop: 'Urban Vegetables',
        waterAccess: 'High',
        recommendations: [
          `Implement ${score > 80 ? 'high-density irrigation' : 'sustainable land management'} techniques.`,
          `Enhanced monitoring for ${floodRisk.toLowerCase()} flood risk zones.`,
          `Prioritize urban greening in areas with ${landCover.builtUp}% built-up density.`
        ],
        coordinates: [lat, lng]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [lng - 0.015, lat - 0.015],
          [lng + 0.015, lat - 0.015],
          [lng + 0.015, lat + 0.015],
          [lng - 0.015, lat + 0.015],
          [lng - 0.015, lat - 0.015]
        ]]
      }
    };
  });
};

export const KEBELE_BOUNDARIES = {
  type: "FeatureCollection",
  features: generateKebeleData()
};

export const kebeles: KebeleData[] = KEBELE_BOUNDARIES.features.map((f: any) => ({
  ...f.properties,
  coordinates: f.properties.coordinates
}));

export const LAND_COVER = {
  type: "FeatureCollection",
  features: Array.from({ length: 40 }).map((_, i) => {
    const lat = BASE_LAT + (Math.random() - 0.5) * 0.15;
    const lng = BASE_LNG + (Math.random() - 0.5) * 0.15;
    const types = ['Forest', 'Cropland', 'Urban', 'Water', 'Grassland'];
    const landType = types[Math.floor(Math.random() * types.length)];
    const colors: Record<string, string> = {
      'Forest': '#059669',
      'Cropland': '#84cc16',
      'Urban': '#4b5563',
      'Water': '#0ea5e9',
      'Grassland': '#d97706'
    };
    return {
      type: "Feature",
      properties: { landType, color: colors[landType], area: Math.floor(Math.random() * 500) },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [lng - 0.005, lat - 0.005],
          [lng + 0.005, lat - 0.005],
          [lng + 0.005, lat + 0.005],
          [lng - 0.005, lat + 0.005],
          [lng - 0.005, lat - 0.005]
        ]]
      }
    };
  })
};

export const ROAD_NETWORK = {
  type: "FeatureCollection",
  features: Array.from({ length: 30 }).map((_, i) => {
    const startLat = BASE_LAT + (Math.random() - 0.5) * 0.2;
    const startLng = BASE_LNG + (Math.random() - 0.5) * 0.2;
    const types = ['Primary', 'Secondary', 'Residential', 'Tracks', 'Paths', 'Service'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      type: "Feature",
      properties: { type, name: `${type} Road ${i}` },
      geometry: {
        type: "LineString",
        coordinates: [
          [startLng, startLat],
          [startLng + (Math.random() - 0.5) * 0.04, startLat + (Math.random() - 0.5) * 0.04]
        ]
      }
    };
  })
};

export const RIVERS = {
  type: "FeatureCollection",
  features: Array.from({ length: 8 }).map((_, i) => {
    const startLat = BASE_LAT + (Math.random() - 0.5) * 0.15;
    const startLng = BASE_LNG + (Math.random() - 0.5) * 0.15;
    return {
      type: "Feature",
      properties: { name: `River ${i + 1}`, type: 'Stream' },
      geometry: {
        type: "LineString",
        coordinates: [
          [startLng, startLat],
          [startLng + 0.03, startLat + 0.02],
          [startLng + 0.06, startLat - 0.02]
        ]
      }
    };
  })
};

export const LAND_SUITABILITY = {
  type: "FeatureCollection",
  features: Array.from({ length: 25 }).map((_, i) => {
    const lat = BASE_LAT + (Math.random() - 0.5) * 0.12;
    const lng = BASE_LNG + (Math.random() - 0.5) * 0.12;
    const levels = ['Very High', 'High', 'Moderate', 'Low', 'Very Low'];
    const level = levels[Math.floor(Math.random() * levels.length)];
    return {
      type: "Feature",
      properties: { suitability_level: level, color: suitabilityColors[level as keyof typeof suitabilityColors] },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [lng - 0.008, lat - 0.008],
          [lng + 0.008, lat - 0.008],
          [lng + 0.008, lat + 0.008],
          [lng - 0.008, lat + 0.008],
          [lng - 0.008, lat - 0.008]
        ]]
      }
    };
  })
};

export const growthHistory = [
  { year: '2020', urban: 30, agriculture: 70 },
  { year: '2021', urban: 35, agriculture: 65 },
  { year: '2022', urban: 42, agriculture: 58 },
  { year: '2023', urban: 48, agriculture: 52 },
  { year: '2024', urban: 55, agriculture: 45 }
];

export const landCoverTypes = [
  { name: 'Urban Forest', area: '12%', color: '#059669', type: 'Forest' },
  { name: 'Built-up', area: '45%', color: '#4b5563', type: 'Urban' },
  { name: 'Farmland', area: '28%', color: '#84cc16', type: 'Cropland' },
  { name: 'Water Body', area: '15%', color: '#0ea5e9', type: 'Water' }
];

export const investmentIndices = [
  { category: 'Technology', index: 8.5, color: '#22d3ee' },
  { category: 'Infrastructure', index: 7.2, color: '#f59e0b' },
  { category: 'Resource Yield', index: 9.1, color: '#10b981' },
  { category: 'Market Demand', index: 8.8, color: '#8b5cf6' }
];

export const roadStyles: Record<string, { color: string; weight: number }> = {
  'Primary': { color: '#fbbf24', weight: 4 },
  'Secondary': { color: '#fcd34d', weight: 3 },
  'Residential': { color: '#ffffff', weight: 2 },
  'Tracks': { color: '#94a3b8', weight: 1.5 },
  'Paths': { color: '#cbd5e1', weight: 1 },
  'Service': { color: '#94a3b8', weight: 1.2 }
};