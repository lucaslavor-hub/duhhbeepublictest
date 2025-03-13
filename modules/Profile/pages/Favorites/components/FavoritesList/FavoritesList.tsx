import { ProductsList } from '@/components/ProductsList';
import { Product } from '@/types';
import { ScrollView, Text, YStack } from 'tamagui';

type FavoritesListProps = {
  fetchNextPage: () => void;
  favorites: Product[];
};

export const FavoritesList = ({ favorites, fetchNextPage }: FavoritesListProps) => {
  return (
    <ScrollView
      marginTop={120}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      onTouchEnd={() => fetchNextPage()}
    >
      {!favorites.length && (
        <YStack flexGrow={1} alignSelf="center" justifyContent="center">
          <Text alignSelf="center">No favorites were found.</Text>
        </YStack>
      )}
      {favorites.length > 0 && <ProductsList products={favorites} />}
    </ScrollView>
  );
};
