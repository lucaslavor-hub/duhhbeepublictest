import { Text, YStack, useWindowDimensions } from 'tamagui';
import { Slides } from '../../helpers';

type OnboardingItemProps = {
  item: Slides;
};

export const OnboardingItem = ({ item }: OnboardingItemProps) => {
  const { width } = useWindowDimensions();
  const { title, description } = item;

  return (
    <YStack w={width} gap={10} justifyContent="center" paddingHorizontal={28}>
      <Text color="$brandBrown" fontSize={28} fontWeight={600}>
        {title}
      </Text>

      <Text fontSize="$md" fontWeight={400} lineHeight={24} color="$brandBrown">
        {description}
      </Text>
    </YStack>
  );
};
