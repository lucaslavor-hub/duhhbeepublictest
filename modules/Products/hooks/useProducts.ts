import { getProducts } from '@/api/products';
import { useGetInfinitePagination } from '@/hooks';
import { Product } from '@/types';
import { parseInfiniteData } from '@/utils/functions/parseInfiniteData';
import Toast from 'react-native-toast-message';

export const useProducts = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } =
    useGetInfinitePagination({
      queryKey: 'products',
      queryFunction: getProducts,
      params: {
        pagination: {
          pageSize: 25,
        },
      },
    });

  const infiniteProducts = parseInfiniteData(data);

  const products: Product[] = infiniteProducts?.map((product) => ({
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

  return { products, isLoading, isFetchingNextPage, fetchNextPage };
};
