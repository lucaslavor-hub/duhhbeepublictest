import { YStack, XStack, Text } from 'tamagui';
import { CustomPlayer } from '@/components/CustomVideoPlayer';

type VideoCardProps = {
  id: number;
  title: string;
  uri: string;
  duration: string;
};

export const VideoCard = (item: VideoCardProps) => {
  return (
    <YStack key={item.id} gap={16}>
      <CustomPlayer uri={item.uri} />
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$lg" fontWeight={600}>
          {item.title}
        </Text>
        <Text fontSize="$sm">{item.duration} min</Text>
      </XStack>
    </YStack>
  );
};
