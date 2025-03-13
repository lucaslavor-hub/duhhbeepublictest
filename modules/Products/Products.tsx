import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { Spinner, View } from 'tamagui';
import { FavoritesList } from '../Profile/pages/Favorites/components';
import { useProducts } from './hooks/useProducts';

export const Products = () => {
  const { products, isLoading, fetchNextPage } = useProducts();

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="small" color="$brandBrown" />
      </View>
    );
  }

  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <FavoritesList fetchNextPage={fetchNextPage} favorites={products} />
    </BackgroundWrapper>
  );
};
