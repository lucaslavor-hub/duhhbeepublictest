import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getConfiguration } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetConfigurationFn = (options?: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<
      FnReturn<typeof getConfiguration>,
      Error,
      FnReturn<typeof getConfiguration>,
      ReadQueryKey
    >,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getConfiguration>, Error>;

export const useGetConfiguration: UseGetConfigurationFn = ({ config, queryConfig } = {}) =>
  useQuery<
    FnReturn<typeof getConfiguration>,
    Error,
    FnReturn<typeof getConfiguration>,
    ReadQueryKey
  >({
    queryKey: ['configuration', config] as ReadQueryKey,
    queryFn: async () => await getConfiguration({ config }),
    ...queryConfig,
  });
