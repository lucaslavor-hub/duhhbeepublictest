import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, YStack } from 'tamagui';

export const WelcomeActions = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ paddingHorizontal: 28 }}>
      <YStack h="100%" justifyContent="flex-end" alignItems="flex-start" gap={40} py={20}>
        <YStack gap={10}>
          <Text color="$brandBrown" fontSize={28} fontWeight={600}>
            Welcome!
          </Text>

          <Text fontSize="$md" fontWeight={400} lineHeight={24} color="$brandBrown">
            Here’s the secret to the best skincare{'\n'}with the Bee
          </Text>
        </YStack>

        <YStack alignItems="center" width="100%" gap={16}>
          <Button
            bg="$primary"
            color="$brandBrown"
            fontWeight={500}
            fontSize="$md"
            h={56}
            width="100%"
            borderRadius={12}
            onPress={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            color="$brandBrown"
            fontWeight={500}
            fontSize="$md"
            h={56}
            width="100%"
            borderRadius={12}
            borderColor="$brandGold"
            onPress={() => router.push('/register')}
          >
            Sign Up
          </Button>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};
