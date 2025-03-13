import { DanceAnimation } from '@/components/Animations/DanceAnimation';
import { CustomSafeArea } from '@/components/CustomSafeArea';
import React from 'react';
import { ImageBackground } from 'react-native';
import { Text, YStack } from 'tamagui';

export const ScanningLoading = () => {
  return (
    <ImageBackground source={require('@/assets/images/login-background.png')} style={{ flex: 1 }}>
      <CustomSafeArea style={{ flex: 1, backgroundColor: 'transparent' }}>
        <YStack
          flex={1}
          gap={24}
          alignItems="center"
          justifyContent="flex-start"
          paddingVertical={24}
        >
          <Text color="$brandBrown" fontSize={28} textAlign="center">
            Loading...
          </Text>
          <DanceAnimation style={{ width: 300, height: 400, alignSelf: 'center' }} />
          <Text width={200} color="$brandBrown" fontSize={14} textAlign="center">
            Sending your image for the bees to analyze, please wait.
          </Text>
        </YStack>
      </CustomSafeArea>
    </ImageBackground>
  );
};
