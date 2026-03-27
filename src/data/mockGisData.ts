/**
 * Enhanced GIS data for AgriUrban Intelligence
 */

export interface KebeleData {
  id: string;
  name: string;
  population: number;
  suitabilityScore: number;
  mainCrop: string;
  waterAccess: string;
  floodRisk: string;
  droughtVulnerability: string;
  landslideHazard: string;
  heatwaveExposure: string;
  soilErosion: string;
  agriculturalPotential: number;
  investmentScore: number;
  coordinates: [number, number];
  landCover: {
    builtUp: number;
    cropLand: number;
    vegetation: number;
    water: number;
    bare: number;
  };
  suitability: string;
}

export const suitabilityColors: Record<string, string> = {
  high: '#10b981',
  medium: '#f59e0b',
  low: '#ef4444'
};

export const landCoverTypes = [
  { type: 'Urban Forest', area: '12%', color: '#059669' },
  { type: 'Built-up', area: '45%', color: '#4b5563' },
  { type: 'Farmland', area: '28%', color: '#84cc16' },
  { type: 'Water Body', area: '15%', color: '#0ea5e9' }
];

export const growthHistory = [
  { year: '2020', urban: 30, agriculture: 70 },
  { year: '2021', urban: 35, agriculture: 65 },
  { year: '2022', urban: 42, agriculture: 58 },
  { year: '2023', urban: 48, agriculture: 52 },
  { year: '2024', urban: 55, agriculture: 45 }
];

export const investmentIndices = [
  { category: 'Technology', index: 8.5, color: '#22d3ee' },
  { category: 'Infrastructure', index: 7.2, color: '#f59e0b' },
  { category: 'Resource Yield', index: 9.1, color: '#10b981' },
  { category: 'Market Demand', index: 8.8, color: '#8b5cf6' }
];

export const kebeles: KebeleData[] = [
  { 
    id: 'keb-01', 
    name: 'Kirkos District - 01', 
    population: 12500, 
    suitabilityScore: 88, 
    mainCrop: 'Urban Vegetables', 
    waterAccess: 'High', 
    floodRisk: 'Moderate', 
    droughtVulnerability: 'Low',
    landslideHazard: 'Low',
    heatwaveExposure: 'High',
    soilErosion: 'Low',
    agriculturalPotential: 92,
    investmentScore: 85,
    coordinates: [38.74, 9.02],
    landCover: { builtUp: 40, cropLand: 35, vegetation: 15, water: 5, bare: 5 },
    suitability: 'high'
  },
  { 
    id: 'keb-02', 
    name: 'Arada District - 04', 
    population: 8900, 
    suitabilityScore: 65, 
    mainCrop: 'Legumes', 
    waterAccess: 'Medium', 
    floodRisk: 'High', 
    droughtVulnerability: 'Moderate',
    landslideHazard: 'High',
    heatwaveExposure: 'Medium',
    soilErosion: 'Moderate',
    agriculturalPotential: 75,
    investmentScore: 62,
    coordinates: [38.75, 9.03],
    landCover: { builtUp: 60, cropLand: 20, vegetation: 10, water: 5, bare: 5 },
    suitability: 'medium'
  },
  { 
    id: 'keb-03', 
    name: 'Bole District - 12', 
    population: 15600, 
    suitabilityScore: 92, 
    mainCrop: 'Fruit Trees', 
    waterAccess: 'High', 
    floodRisk: 'Low', 
    droughtVulnerability: 'High',
    landslideHazard: 'Low',
    heatwaveExposure: 'Low',
    soilErosion: 'Low',
    agriculturalPotential: 95,
    investmentScore: 90,
    coordinates: [38.76, 9.02],
    landCover: { builtUp: 30, cropLand: 40, vegetation: 20, water: 5, bare: 5 },
    suitability: 'high'
  }
];

export const KEBELE_BOUNDARIES = {
  type: "FeatureCollection",
  features: kebeles.map((k) => ({
    type: "Feature",
    properties: k,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [k.coordinates[0], k.coordinates[1]],
          [k.coordinates[0] + 0.01, k.coordinates[1]],
          [k.coordinates[0] + 0.01, k.coordinates[1] + 0.01],
          [k.coordinates[0], k.coordinates[1] + 0.01],
          [k.coordinates[0], k.coordinates[1]]
        ]
      ]
    }
  }))
};