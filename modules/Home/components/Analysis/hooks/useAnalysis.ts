import { useGetUser } from '@/api/user/hooks/useGetUser';
import { analysisPercentageFn, LEVELS, STEPS } from '../utils/analysisPercentageFn';
import { skinRoutineTagFn } from '../utils/skinRoutineTagFn';

export const useAnalysis = () => {
  const { data, isLoading } = useGetUser();
  const tags = data?.tags;

  const skinRoutineTag = skinRoutineTagFn(tags);

  const acne = analysisPercentageFn({
    key: 'acne',
    value: tags?.acne || LEVELS.acne[0],
    levels: LEVELS.acne,
    steps: STEPS.acne,
  });

  const skinType = analysisPercentageFn({
    key: 'skinType',
    value: tags?.skinType || LEVELS.skinType[0],
    levels: LEVELS.skinType,
    steps: STEPS.skinType,
  });

  const sunExposure = analysisPercentageFn({
    key: 'sunExposure',
    value: tags?.sunExposure || LEVELS.sunExposure[0],
    levels: LEVELS.sunExposure,
    steps: STEPS.sunExposure,
  });

  const skincareRoutine = analysisPercentageFn({
    key: 'skincareRoutine',
    value: skinRoutineTag || LEVELS.skincareRoutine[0],
    levels: LEVELS.skincareRoutine,
    steps: STEPS.skincareRoutine,
  });

  return {
    analysis: [acne, skinType],
    analysisSecondary: [sunExposure, skincareRoutine],
    isLoading,
  };
};
