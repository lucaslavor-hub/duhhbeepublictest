import { Image, Text, View, YStack } from 'tamagui';
import { SubmitButton } from '@/components/SubmitButton';
import { useRouter } from 'expo-router';

import beeHead from '@/assets/images/bee-head.png';
import scanGrid from '@/assets/images/scan.png';
import React from 'react';
import { CustomSafeArea } from '@/components/CustomSafeArea';
import { usePlaySoundEffect } from '@/hooks/usePlaySoundEffect';

const rules = [
  { rule: 'Well-lit environment', description: 'Take your photo in good lighting.' },
  { rule: 'Clear Face', description: 'Remove glasses and accessories' },
  { rule: 'Visible', description: 'Make sure your entire face is visible.' },
];

export const FaceScanning = () => {
  const router = useRouter();
  const { playSound } = usePlaySoundEffect({});

  const handleNext = () => {
    playSound();
    router.push({ pathname: '/register/face-scanning/camera' });
  };

  return (
    <CustomSafeArea>
      <YStack flex={1} paddingTop={20} justifyContent="space-between">
        <YStack alignItems="center" gap={20}>
          <YStack alignItems="center" gap={20}>
            <View>
              <Image src={beeHead} />
              <Image src={scanGrid} position="absolute" bottom={0} alignSelf="center" />
            </View>
            <Text fontSize={28} fontWeight={500} lineHeight={34} color="$brandBrown">
              Face scanning
            </Text>
          </YStack>

          <Text fontSize="$md" textAlign="center" lineHeight={24} color="$brandBrown">
            Take a photo of your face so the bee can analyze your skin.
          </Text>
        </YStack>
        <YStack gap={20}>
          {rules?.map(({ rule, description }, index) => {
            return (
              <YStack key={index} py={16} px={24} gap={6} bg="$brandGray" borderRadius={8}>
                <Text fontSize="$md" color="$brandBrown" fontWeight={600} lineHeight={22}>
                  {rule}
                </Text>
                <Text fontSize="$sm" color="$brandBrown" fontWeight={400} lineHeight={24}>
                  {description}
                </Text>
              </YStack>
            );
          })}
        </YStack>
        <SubmitButton label="Start!" onPress={handleNext} />
      </YStack>
    </CustomSafeArea>
  );
};
