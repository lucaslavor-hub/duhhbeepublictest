import { useProgress } from '@/modules/Home/hooks/useProgress';
import { AnalysisCard } from '@/modules/Home/types';
import { Animated } from 'react-native';
import { Stack, Text, View, XStack, YStack } from 'tamagui';

type AnalysisCardSecondaryProps = {
  item: AnalysisCard;
};

export const AnalysisCardSecondary = ({ item }: AnalysisCardSecondaryProps) => {
  const { progressWidth } = useProgress({ percentage: item.percentage });

  return (
    <Stack flex={1} display="flex" gap={16} padding={16}>
      <Text fontSize={14} color="$brandBrown" fontWeight={500}>
        {item.title}
      </Text>

      <YStack gap={8}>
        <View height={11} bg="#EDF2F7" borderRadius={16}>
          <Animated.View
            style={{
              width: progressWidth as `${number}%`,
              height: 11,
              borderRadius: 16,
              backgroundColor: '#FBBF00',
            }}
          />
        </View>
        <XStack alignItems="center" justifyContent="space-between" gap={8}>
          {item.levels.map((level) => (
            <XStack key={level} justifyContent="space-between">
              <Text fontSize={10} color="#9A9A9A">
                {level}
              </Text>
            </XStack>
          ))}
        </XStack>
      </YStack>
    </Stack>
  );
};
