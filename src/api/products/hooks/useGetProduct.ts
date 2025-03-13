import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getProduct } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';

type ReadQueryKey = [string, number, AxiosRequestConfig | undefined];

export type UseGetProductFn = (options: {
  id: number;
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<FnReturn<typeof getProduct>, Error, FnReturn<typeof getProduct>, ReadQueryKey>,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getProduct>, Error>;

export const useGetProduct: UseGetProductFn = ({ id, config, queryConfig }) => {
  const query = useQuery<
    FnReturn<typeof getProduct>,
    Error,
    FnReturn<typeof getProduct>,
    ReadQueryKey
  >({
    queryKey: ['product', id, config] as ReadQueryKey,
    queryFn: async () => await getProduct({ id, config }),
    ...queryConfig,
  });

  return query;
};
