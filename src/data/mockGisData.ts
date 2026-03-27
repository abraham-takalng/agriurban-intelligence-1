export interface KebeleData {
  id: string;
  name: string;
  population: number;
  suitability: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Very Low';
  landCover: {
    builtUp: number;
    cropLand: number;
    vegetation: number;
    water: number;
    bare: number;
  };
  agriculturalPotential: number; // 0-100
  urbanPotential: number; // 0-100
  investmentScore: number; // 0-100
}

export const kebeles: KebeleData[] = [
  { id: '1', name: 'Araddaa Miccaa', population: 12500, suitability: 'High', landCover: { builtUp: 45, cropLand: 35, vegetation: 15, water: 2, bare: 3 }, agriculturalPotential: 78, urbanPotential: 82, investmentScore: 80 },
  { id: '2', name: 'Baha Biiftuu', population: 9800, suitability: 'Moderate', landCover: { builtUp: 30, cropLand: 50, vegetation: 10, water: 5, bare: 5 }, agriculturalPotential: 85, urbanPotential: 65, investmentScore: 72 },
  { id: '3', name: 'Bolee Tokkummaa', population: 15400, suitability: 'Very High', landCover: { builtUp: 60, cropLand: 20, vegetation: 15, water: 2, bare: 3 }, agriculturalPotential: 60, urbanPotential: 95, investmentScore: 92 },
  { id: '4', name: 'Caffee Donsaa', population: 11200, suitability: 'High', landCover: { builtUp: 25, cropLand: 60, vegetation: 10, water: 2, bare: 3 }, agriculturalPotential: 88, urbanPotential: 45, investmentScore: 68 },
  { id: '5', name: 'Coffee Horaa', population: 8900, suitability: 'Moderate', landCover: { builtUp: 15, cropLand: 70, vegetation: 10, water: 3, bare: 2 }, agriculturalPotential: 92, urbanPotential: 30, investmentScore: 65 },
  { id: '6', name: 'Fincaa’aa Bamoo', population: 10500, suitability: 'Low', landCover: { builtUp: 10, cropLand: 55, vegetation: 25, water: 5, bare: 5 }, agriculturalPotential: 75, urbanPotential: 25, investmentScore: 45 },
  { id: '7', name: 'Handhuraa Roobee', population: 18200, suitability: 'Very High', landCover: { builtUp: 75, cropLand: 10, vegetation: 5, water: 2, bare: 8 }, agriculturalPotential: 40, urbanPotential: 98, investmentScore: 95 },
  { id: '8', name: 'Hawushhoo', population: 9200, suitability: 'Moderate', landCover: { builtUp: 20, cropLand: 65, vegetation: 10, water: 2, bare: 3 }, agriculturalPotential: 82, urbanPotential: 40, investmentScore: 60 },
  { id: '9', name: 'Horaa Booqaa', population: 11000, suitability: 'High', landCover: { builtUp: 35, cropLand: 45, vegetation: 15, water: 3, bare: 2 }, agriculturalPotential: 80, urbanPotential: 60, investmentScore: 75 },
  { id: '10', name: 'Kibxaatee', population: 13200, suitability: 'Very High', landCover: { builtUp: 55, cropLand: 25, vegetation: 15, water: 2, bare: 3 }, agriculturalPotential: 65, urbanPotential: 88, investmentScore: 85 },
  { id: '11', name: 'Odaa Bahaa', population: 7600, suitability: 'Moderate', landCover: { builtUp: 12, cropLand: 75, vegetation: 8, water: 2, bare: 3 }, agriculturalPotential: 94, urbanPotential: 20, investmentScore: 55 },
  { id: '12', name: 'Odaa Roobee', population: 16500, suitability: 'High', landCover: { builtUp: 65, cropLand: 15, vegetation: 10, water: 5, bare: 5 }, agriculturalPotential: 55, urbanPotential: 90, investmentScore: 88 },
  { id: '13', name: 'Walta’i Caffee', population: 9400, suitability: 'Moderate', landCover: { builtUp: 22, cropLand: 60, vegetation: 12, water: 3, bare: 3 }, agriculturalPotential: 85, urbanPotential: 45, investmentScore: 65 },
  { id: '14', name: 'Walta’i Tooshaa', population: 10800, suitability: 'Low', landCover: { builtUp: 18, cropLand: 65, vegetation: 10, water: 4, bare: 3 }, agriculturalPotential: 80, urbanPotential: 35, investmentScore: 50 },
];

export const landCoverTypes = [
  { name: 'Water', color: '#3b82f6' },
  { name: 'Tree Vegetation', color: '#22c55e' },
  { name: 'Crop Land', color: '#eab308' },
  { name: 'Built-up Urban', color: '#ef4444' },
  { name: 'Bare Land', color: '#78350f' },
];

export const suitabilityColors = {
  'Very High': '#15803d',
  'High': '#22c55e',
  'Moderate': '#fde047',
  'Low': '#f97316',
  'Very Low': '#ef4444',
};

export const growthHistory = [
  { year: 2000, urbanArea: 450, agriculture: 1200 },
  { year: 2005, urbanArea: 580, agriculture: 1150 },
  { year: 2010, urbanArea: 720, agriculture: 1080 },
  { year: 2015, urbanArea: 950, agriculture: 1010 },
  { year: 2020, urbanArea: 1240, agriculture: 920 },
  { year: 2025, urbanArea: 1680, agriculture: 810 },
  { year: 2030, urbanArea: 2150, agriculture: 720 },
  { year: 2035, urbanArea: 2700, agriculture: 610 },
];

export const investmentIndices = [
  { name: 'Kebele Center', score: 95, color: '#4f46e5' },
  { name: 'North Corridor', score: 82, color: '#6366f1' },
  { name: 'South Expansion', score: 88, color: '#818cf8' },
  { name: 'East Ag-Zone', score: 76, color: '#a5b4fc' },
  { name: 'West Industrial', score: 64, color: '#c7d2fe' },
];