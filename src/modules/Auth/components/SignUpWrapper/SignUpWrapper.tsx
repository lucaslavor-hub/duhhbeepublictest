import { SignUpSteps, useSignUpStore } from '@/store/useSignUpStore';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';
import { styled, View, XStack, YStack } from 'tamagui';

type SignUpWrapperProps = {
  children: React.ReactNode;
};

const ProgressView = styled(View, {
  height: 5,
  borderRadius: 4,
});

const steps = [
  { step: SignUpSteps.NAME },
  { step: SignUpSteps.BIRTH },
  { step: SignUpSteps.CREDENTIALS },
];

export const SignUpWrapper = ({ children }: SignUpWrapperProps) => {
  const currentStep = useSignUpStore((state) => state.step);

  const step1 = useSharedValue(0);
  const step2 = useSharedValue(0);
  const step3 = useSharedValue(0);

  useEffect(() => {
    const updateProgress = (step: SharedValue<number>, index: number) => {
      const targetValue = index <= steps.findIndex((s) => s.step === currentStep) ? 90 : 0;
      step.value = withSpring(targetValue, { damping: 20, stiffness: 90 });
    };

    updateProgress(step1, 0);
    updateProgress(step2, 1);
    updateProgress(step3, 2);
  }, [currentStep, step1, step2, step3]);

  const animatedStyle1 = useAnimatedStyle(() => ({ width: step1.value }), [step1]);
  const animatedStyle2 = useAnimatedStyle(() => ({ width: step2.value }), [step2]);
  const animatedStyle3 = useAnimatedStyle(() => ({ width: step3.value }), [step3]);

  return (
    <YStack flex={1} justifyContent="flex-start" alignItems="center">
      <XStack py={40} gap={20}>
        <ProgressView bg="$brandGray" width={90}>
          <Animated.View style={[{ height: 5, backgroundColor: '#FBBF00' }, animatedStyle1]} />
        </ProgressView>
        <ProgressView bg="$brandGray" width={90}>
          <Animated.View style={[{ height: 5, backgroundColor: '#FBBF00' }, animatedStyle2]} />
        </ProgressView>
        <ProgressView bg="$brandGray" width={90}>
          <Animated.View style={[{ height: 5, backgroundColor: '#FBBF00' }, animatedStyle3]} />
        </ProgressView>
      </XStack>
      {children}
    </YStack>
  );
};
