import { getFavorites } from '@/api/user';
import { useGetInfinitePagination } from '@/hooks';
import { Product } from '@/types';
import { parseInfiniteData } from '@/utils/functions/parseInfiniteData';
import Toast from 'react-native-toast-message';

export const useFavorites = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } =
    useGetInfinitePagination({
      queryKey: 'favorites',
      queryFunction: getFavorites,
      params: {
        pagination: {
          pageSize: 25,
        },
      },
    });

  const infiniteFavorites = parseInfiniteData(data);

  const favorites: Product[] = infiniteFavorites.map((product) => ({
    id: product.id,
    title: product.name,
    description: product.description,
    price: product.price,
    image: product.imageUrl?.url,
  }));

  if (isError) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error while fetching favorites.',
      text2: error?.message,
    });
  }

  return { favorites, isLoading, isFetchingNextPage, fetchNextPage };
};
