import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getMatchingProduct } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetMatchingProductFn = (options: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<
      FnReturn<typeof getMatchingProduct>,
      Error,
      FnReturn<typeof getMatchingProduct>,
      ReadQueryKey
    >,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getMatchingProduct>, Error>;

export const useGetMatchingProduct: UseGetMatchingProductFn = ({ config, queryConfig }) => {
  const query = useQuery<
    FnReturn<typeof getMatchingProduct>,
    Error,
    FnReturn<typeof getMatchingProduct>,
    ReadQueryKey
  >({
    queryKey: ['matching-product', config] as ReadQueryKey,
    queryFn: async () => await getMatchingProduct({ config }),
    ...queryConfig,
  });

  return query;
};
