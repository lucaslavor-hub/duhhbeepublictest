import { Tags } from '@/api/auth/types';

export const skinRoutineTagFn = (tags?: Tags) => {
  const skinAffectingHabits = tags?.skinAffectingHabits;
  const hydration = tags?.hydration;
  const diet = tags?.diet;

  if (skinAffectingHabits === 'None' && diet === 'Balanced diet' && hydration === 'Regular') {
    return 'Healthy';
  } else if (
    skinAffectingHabits === 'Alcohol Consumption' &&
    diet === 'Balanced diet' &&
    hydration === 'Moderate'
  ) {
    return 'Moderate';
  } else if (
    skinAffectingHabits === 'Smoker' &&
    diet === 'Unbalanced diet' &&
    hydration === 'Moderate'
  ) {
    return 'Harmful';
  } else if (
    skinAffectingHabits === 'Others' &&
    diet === 'Unbalanced diet' &&
    hydration === 'Low'
  ) {
    return 'Unhealthy';
  }

  return 'Healthy';
};
