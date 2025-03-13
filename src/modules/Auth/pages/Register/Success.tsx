import { Text, YStack } from 'tamagui';
import { SubmitButton } from '@/components/SubmitButton';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useSmartBeeStore } from '@/store/useSmartBeeStore';
import { useCallback } from 'react';
import { HandAnimation } from '@/components/Animations/HandAnimation';
import { useFaceScanningStore } from '@/store/useFaceScanningStore';
import { useSession } from '@/providers/auth';

export const Success = () => {
  const credentials = useSignUpStore((state) => state.credentials);
  const resetSignUp = useSignUpStore((state) => state.resetStore);
  const resetSmartBee = useSmartBeeStore((state) => state.resetStore);
  const resetFaceScanning = useFaceScanningStore((state) => state.resetStore);

  const { signIn } = useSession();

  const onSubmit = useCallback(async () => {
    if (!credentials) return;

    try {
      await signIn({ identifier: credentials?.email, password: credentials?.password });

      resetSignUp();
      resetSmartBee();
      resetFaceScanning();
    } catch (error) {
      console.error(error);
    }
  }, [credentials, resetFaceScanning, resetSignUp, resetSmartBee, signIn]);

  return (
    <YStack height="100%" alignItems="center" justifyContent="flex-end" gap={60}>
      <YStack gap={20}>
        <HandAnimation style={{ width: 300, height: 400, alignSelf: 'center' }} />
        <Text textAlign="center" fontSize={28} lineHeight={34}>
          Hi! My name is <Text fontWeight={600}>Bee</Text>.{'\n'} I’m here to help you!
        </Text>
        <Text fontSize="$xs" textAlign="center" color="$brandBrown" lineHeight={22}>
          Duhhbee is an AI that provides health and wellness tips. We're not doctors, we don't
          conduct consultations, we just suggest. The decision is always up to the user. In case of
          doubts or contraindications, seek a professional.
        </Text>
      </YStack>
      <SubmitButton label="Next" onPress={onSubmit} />
    </YStack>
  );
};
