import { HeaderArrow } from '@/components/HeaderArrow';
import { useRouter } from 'expo-router';
import { useSmartBeeStore } from '@/store/useSmartBeeStore';

export const SmartBeeButton = () => {
  const router = useRouter();
  const questions = useSmartBeeStore((state) => state.questions);
  const currentStep = useSmartBeeStore((state) => state.currentStep);
  const prevStep = useSmartBeeStore((state) => state.prevStep);

  return (
    <HeaderArrow
      onPress={() => {
        if (questions[currentStep].order === 0) {
          router.back();
        }

        prevStep();
      }}
    />
  );
};
