import { useProgress } from '@/modules/Home/hooks/useProgress';
import { AnalysisCard as AnalysisCardType } from '@/modules/Home/types';
import React from 'react';
import { Animated, ImageBackground } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';
import image from '@/assets/images/analysis-background.png';

type AnalysisCardProps = {
  item: AnalysisCardType;
};

export const AnalysisCard = ({ item }: AnalysisCardProps) => {
  const { progressWidth } = useProgress({ percentage: item.percentage });

  return (
    <ImageBackground source={image} resizeMode="cover" borderRadius={16}>
      <YStack flex={1} gap={16} padding={24}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} color="$brandBrown" fontWeight={500}>
            {item.title}
          </Text>
          <Text fontSize={10} color="$brandBrown">
            Powered By DuhhBee AI
          </Text>
        </XStack>

        <YStack gap={8}>
          <View height={11} bg="rgba(255,255,255, 0.5)" borderRadius={16} position="relative">
            <Animated.View
              style={{
                width: progressWidth as `${number}%`,
                height: 11,
                borderRadius: 16,
                backgroundColor: '#BB6B14',
              }}
            />
          </View>
          <XStack alignItems="center" justifyContent="space-between" gap={8}>
            {item.steps.map((level) => (
              <XStack key={level} justifyContent="space-between">
                <Text fontSize={10} opacity={0.5} color="$brandBrown">
                  {level}
                </Text>
              </XStack>
            ))}
          </XStack>
        </YStack>
      </YStack>
    </ImageBackground>
  );
};
