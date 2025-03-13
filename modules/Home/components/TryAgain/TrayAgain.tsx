import { FlyAnimation } from '@/components/Animations/FlyAnimation';
import { router } from 'expo-router';
import { YStack, XStack, Text, Image, Button } from 'tamagui';
import bannerDetail from '@/assets/images/banner-detail.png';
import { usePlaySoundEffect } from '@/hooks/usePlaySoundEffect';

export const TrayAgain = () => {
  const { playSound } = usePlaySoundEffect({});

  return (
    <YStack bg="$primary" borderRadius={8} padding={24} position="relative">
      <XStack position="relative">
        <YStack gap={10}>
          <Text fontSize={28} color="$brandBrown">
            Try again?
          </Text>

          <YStack alignItems="flex-start" gap={12}>
            <Text fontSize="$xs" maxWidth={220} color="$brandBrown">
              If you want to redo or perform the analysis again with DuhhBee, our intelligent AI
              that evaluates your skin and answers questions to recommend the ideal products for
              you.
            </Text>

            <Button
              borderRadius={80}
              h={30}
              maxWidth={160}
              fontSize="$xs"
              bg="$brandGold"
              color="white"
              onPress={() => {
                playSound();
                router.push({ pathname: '/register/face-scanning' });
              }}
            >
              Click here to reassess
            </Button>
          </YStack>
        </YStack>
        <FlyAnimation
          style={{ height: 160, width: 160, position: 'absolute', right: -45, bottom: 0 }}
        />
      </XStack>
      <Image src={bannerDetail} position="absolute" bottom={-40} right={0} zIndex={-1} />
    </YStack>
  );
};
