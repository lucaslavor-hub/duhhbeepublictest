import { HeaderArrow } from '@/components/HeaderArrow/HeaderArrow';
import { SignUpSteps, useSignUpStore } from '@/store/useSignUpStore';
import { useRouter } from 'expo-router';

export const SignUpButton = () => {
  const router = useRouter();
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);

  return (
    <HeaderArrow
      type="primary"
      onPress={() => {
        if (step === SignUpSteps.NAME) {
          router.back();
        }

        if (step === SignUpSteps.BIRTH) {
          setStep(SignUpSteps.NAME);
        }

        if (step === SignUpSteps.CREDENTIALS) {
          setStep(SignUpSteps.BIRTH);
        }
      }}
    />
  );
};
