import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getRecommendedProducts } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetRecommendedProductsFn = (options?: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<
      FnReturn<typeof getRecommendedProducts>,
      Error,
      FnReturn<typeof getRecommendedProducts>,
      ReadQueryKey
    >,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getRecommendedProducts>, Error>;

export const useGetRecommendedProducts: UseGetRecommendedProductsFn = ({
  config,
  queryConfig,
} = {}) =>
  useQuery<
    FnReturn<typeof getRecommendedProducts>,
    Error,
    FnReturn<typeof getRecommendedProducts>,
    ReadQueryKey
  >({
    queryKey: ['recommended-products', config] as ReadQueryKey,
    queryFn: async () => await getRecommendedProducts({ config }),
    ...queryConfig,
  });
