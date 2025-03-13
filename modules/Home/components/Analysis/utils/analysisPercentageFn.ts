type AnalysisPercentageFnParams = {
  key: string;
  value: string;
  levels: string[];
  steps: string[];
};

export const LEVELS = {
  acne: [
    'Clear Skin',
    'Occasional Spots',
    'Mild Acne',
    'Moderate Acne',
    'Severe Acne',
    'Very Severe Acne',
  ],
  skinType: ['Dry', 'Combination', 'Oily'],
  skinSpots: ['Low', 'Moderate', 'High'],
  sunExposure: ['Low', 'Moderate', 'High'],
  skincareRoutine: ['Healthy', 'Moderate', 'Harmful', 'Unhealthy'],
};

export const STEPS = {
  acne: ['Clear Skin', 'Mild Acne', 'Severe Acne'],
  skinType: ['Dry', 'Combination', 'Oily'],
  skinSpots: ['Low', 'Mid', 'High'],
  sunExposure: ['Low', 'Mid', 'High'],
  skincareRoutine: ['Healthy', 'Mixed', 'Unbalanced'],
};

const TITLES: Record<string, string> = {
  acne: 'Acne Level',
  skinType: 'Skin Type',
  skinSpots: 'Skin Spots',
  sunExposure: 'Sun Exposure',
  skincareRoutine: 'Routine',
};

export const analysisPercentageFn = ({ key, value, levels, steps }: AnalysisPercentageFnParams) => {
  const levelIndex = levels.indexOf(value);

  if (levelIndex === -1) {
    throw new Error(`Value "${value}" not found in levels for key "${key}"`);
  }

  const percentage = levelIndex / (levels.length - 1);

  return {
    id: Math.random(),
    title: TITLES[key],
    percentage,
    levels,
    steps,
  };
};
