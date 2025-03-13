import { Circle, Stack, Text, XStack, YStack } from 'tamagui';
import { useSession } from '@/providers/auth';
import { capitalizeFn } from '@/utils/functions/capitalizeFn';
import { FlyAnimation } from '@/components/Animations/FlyAnimation';

export const Welcome = () => {
  const { session } = useSession();
  const name = session?.user?.username;

  return (
    <YStack gap={20} w="100%">
      <YStack alignItems="flex-start" justifyContent="flex-start" gap={2}>
        <Text fontSize={28} fontWeight={700} color="$brandBrown">
          Hi {capitalizeFn(name ?? '')},
        </Text>
        <Text fontSize="$md" color="$brandBrown">
          Check your result and recommendations!
        </Text>
      </YStack>

      <XStack position="relative" height={350} justifyContent="flex-end" alignItems="flex-start">
        <Circle bg="$primary" width={300} height={300} position="absolute" left={-150} top={20} />
        <FlyAnimation
          style={{
            height: 340,
            width: 360,
            position: 'absolute',
            left: -120,
          }}
        />
        <Stack
          bg="white"
          padding={16}
          marginRight={20}
          borderTopRightRadius={16}
          borderTopLeftRadius={16}
          borderBottomRightRadius={16}
          shadowColor="black"
          shadowOffset={{ height: 10, width: 0 }}
          shadowRadius={10}
          shadowOpacity={0.1}
          width={165}
        >
          <Text>BZZ! Here is what a recomend for you. Check bellow.</Text>
        </Stack>
      </XStack>
    </YStack>
  );
};
