import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getProducts } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';
import { config } from '@tamagui/config/v3';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetProductsFn = (options?: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<
      FnReturn<typeof getProducts>,
      Error,
      FnReturn<typeof getProducts>,
      ReadQueryKey
    >,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getProducts>, Error>;

export const useGetProducts: UseGetProductsFn = ({ config, queryConfig } = {}) =>
  useQuery<FnReturn<typeof getProducts>, Error, FnReturn<typeof getProducts>, ReadQueryKey>({
    queryKey: ['products', config] as ReadQueryKey,
    queryFn: async () => await getProducts({ config }),
    ...queryConfig,
  });
