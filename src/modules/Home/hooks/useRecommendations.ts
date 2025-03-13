import { getRecommendedProducts } from '@/api/products';
import { useGetInfinitePagination } from '@/hooks';
import { Product } from '@/types';
import { parseInfiniteData } from '@/utils/functions/parseInfiniteData';
import Toast from 'react-native-toast-message';

type UseRecommendationsReturn = {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  products: Product[];
  fetchNextPage: () => void;
};

export const useRecommendations = (): UseRecommendationsReturn => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, isError } = useGetInfinitePagination({
    queryKey: 'recommended-products',
    queryFunction: getRecommendedProducts,
    params: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const infiniteProducts = parseInfiniteData(data);

  const products: Product[] = infiniteProducts.map((product) => ({
    id: product.id,
    title: product.name,
    description: product.description,
    price: product.price,
    image: product?.imageUrl?.url,
  }));

  if (isError) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error while fetching recommendations.',
    });
  }

  return { isLoading, isFetchingNextPage, products, fetchNextPage };
};
