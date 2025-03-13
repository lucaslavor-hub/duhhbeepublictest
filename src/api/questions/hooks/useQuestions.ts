import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { getQuestions } from '..';
import { FnReturn } from '@/types/tanstack-factory';
import { AxiosRequestConfig } from 'axios';
import { config } from '@tamagui/config/v3';

type ReadQueryKey = [string, AxiosRequestConfig | undefined];

export type UseGetQuestionsFn = (options?: {
  config?: AxiosRequestConfig;
  queryConfig?: Omit<
    UseQueryOptions<
      FnReturn<typeof getQuestions>,
      Error,
      FnReturn<typeof getQuestions>,
      ReadQueryKey
    >,
    'queryKey'
  >;
}) => UseQueryResult<FnReturn<typeof getQuestions>, Error>;

export const useGetQuestions: UseGetQuestionsFn = ({ config, queryConfig } = {}) =>
  useQuery<FnReturn<typeof getQuestions>, Error, FnReturn<typeof getQuestions>, ReadQueryKey>({
    queryKey: ['questions', config] as ReadQueryKey,
    queryFn: async () => await getQuestions({ config }),
    ...queryConfig,
  });
