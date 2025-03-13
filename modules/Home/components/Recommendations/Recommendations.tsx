import { Paragraph, Text, YStack } from 'tamagui';
import { ProductsList } from '@/components/ProductsList';
import { useRecommendations } from '../../hooks';
import { RecommendationsFallback } from './RecommendationsFallback';

export const Recommendations = () => {
  const { products, isLoading } = useRecommendations();

  if (isLoading) return <RecommendationsFallback />;

  return (
    <YStack flex={1} alignItems="flex-start" gap={24}>
      <Text fontSize={22} fontWeight={600} color="$brandBrown">
        Check-out other options
      </Text>
      <Paragraph fontSize={16} color="$brandBrown">
        Additionally, based on your preferences, here are other products that might be perfect for
        your skin!
      </Paragraph>
      {products.length > 0 && <ProductsList products={products} />}
      {!products.length && (
        <YStack flexGrow={1} alignSelf="center" justifyContent="center">
          <Text alignSelf="center">No products were found.</Text>
        </YStack>
      )}
    </YStack>
  );
};
