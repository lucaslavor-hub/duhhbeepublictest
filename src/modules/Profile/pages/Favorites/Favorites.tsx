import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { FavoritesList } from './components';
import { Spinner, View } from 'tamagui';
import { useFavorites } from './hooks';

export const Favorites = () => {
  const { favorites, isLoading, fetchNextPage } = useFavorites();

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center">
        <Spinner size="small" color="$brandBrown" />
      </View>
    );
  }

  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <FavoritesList fetchNextPage={fetchNextPage} favorites={favorites} />
    </BackgroundWrapper>
  );
};
