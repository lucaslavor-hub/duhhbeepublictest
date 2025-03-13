import { useRouter } from 'expo-router';
import { YStack, Paragraph, Text, Button } from 'tamagui';

export const FullProductsLine = () => {
  const router = useRouter();
  return (
    <YStack flex={1} alignItems="flex-start" gap={24}>
      <Text fontSize={22} fontWeight={600} color="$brandBrown">
        Check our full line of Products
      </Text>
      <Paragraph fontSize={16} color="$brandBrown">
        Explore our full range of products on the website
      </Paragraph>

      <Button
        fontSize="$xs"
        bg="$brandGold"
        color="white"
        height={30}
        maxWidth={160}
        borderRadius={80}
        onPress={() => router.push({ pathname: '/authenticated/products' })}
      >
        See All Our Products
      </Button>
    </YStack>
  );
};
