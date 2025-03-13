import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getUser } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetUserFn = (options?: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<FnReturn<typeof getUser>, Error, FnReturn<typeof getUser>, ReadQueryKey>,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getUser>, Error>;

export const useGetUser: UseGetUserFn = ({ config, queryConfig } = {}) =>
  useQuery<FnReturn<typeof getUser>, Error, FnReturn<typeof getUser>, ReadQueryKey>({
    queryKey: ['user', config] as ReadQueryKey,
    queryFn: async () => await getUser({ config }),
    ...queryConfig,
  });
