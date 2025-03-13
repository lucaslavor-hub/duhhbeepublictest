import { Paragraph, Text, YStack } from 'tamagui';
import { Image } from 'expo-image';
import { MainRecommendationsFallback } from './MainRecommendationFallback';
import { useGetMatchingProduct } from '@/api/products/hooks/useGetMatchingProduct';
import { useRouter } from 'expo-router';
import { useAddHistory } from '@/api/user/hooks/useAddHistory';

export const MainRecommendation = () => {
  const router = useRouter();
  const { mutate: addHistory } = useAddHistory();
  const { data, isLoading } = useGetMatchingProduct({});

  const mainRecommendation = {
    id: data?.data.id,
    title: data?.data.name,
    description: data?.data.description,
    price: data?.data.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    image: data?.data.imageUrl?.url,
  };

  const handleRedirect = (id: number) => {
    addHistory({ body: { productId: id } });
    router.push({ pathname: `/authenticated/product/[id]`, params: { id } });
  };

  if (isLoading) return <MainRecommendationsFallback />;

  return (
    <YStack flex={1} alignItems="flex-start" gap={24}>
      <Text fontSize={22} fontWeight="semibold" color="$brandBrown">
        Here's our main recommendation
      </Text>

      <Paragraph fontSize={16} color="$brandBrown">
        Based on our analysis and form responses, here’s what truly suits your skin best!
      </Paragraph>

      <YStack
        gap={16}
        padding={16}
        borderWidth={2}
        borderRadius={8}
        backgroundColor="white"
        borderColor="#FBBF00"
        shadowColor="#FBBF00"
        shadowOffset={{ height: 5, width: 0 }}
        shadowRadius={10}
        shadowOpacity={0.5}
      >
        {/* IMAGE */}
        <Image
          source={mainRecommendation.image}
          style={{ height: 100, width: 100, alignSelf: 'center' }}
          contentFit="contain"
          transition={1000}
        />

        <Text fontSize={16} fontWeight={600} color="$brandBrown">
          {mainRecommendation.title}
        </Text>
        <Paragraph fontSize={12} lineHeight={16} color="$brandBrown">
          {mainRecommendation.description}
        </Paragraph>

        <Text fontSize={17} lineHeight={22} fontWeight={700} color="$brandBrown">
          {mainRecommendation.price}
        </Text>

        <Text
          fontSize={17}
          lineHeight={22}
          textDecorationLine="underline"
          fontWeight={700}
          {...(mainRecommendation.id && {
            onPress: () => handleRedirect(mainRecommendation.id as number),
          })}
          color="$brandBrown"
        >
          Find out more
        </Text>
      </YStack>
    </YStack>
  );
};
