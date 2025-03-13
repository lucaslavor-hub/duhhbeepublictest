import { ManyResponse, ReadFn } from '@/api/types';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

type QueryConfig<TData> = Partial<
  UseInfiniteQueryOptions<
    ManyResponse<TData>,
    Error,
    InfiniteData<ManyResponse<TData>, Error>,
    ManyResponse<TData>,
    QueryKey,
    number
  >
>;

type UseQueryResult<TData> = UseInfiniteQueryResult<
  InfiniteData<ManyResponse<TData>, unknown>,
  Error
>;

type UseGetInfinitePaginationProps<TData> = {
  queryKey: string;
  params: AxiosRequestConfig['params'];
  queryFunction: ReadFn<TData>;
  queryConfig?: QueryConfig<TData>;
};

export const useGetInfinitePagination = <TData>({
  queryKey,
  params,
  queryFunction,
  queryConfig,
}: UseGetInfinitePaginationProps<TData>): UseQueryResult<TData> =>
  useInfiniteQuery({
    queryKey: [queryKey, params],
    queryFn: async ({ pageParam = 0 }) => {
      return queryFunction({
        config: {
          params: {
            ...params,
            pagination: {
              ...params.pagination,
              page: pageParam,
            },
          },
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage?.meta?.pagination?.total / params.pagination.pageSize);
      const nextPage = allPages.length + 1;

      return nextPage <= maxPages ? nextPage : undefined;
    },
    ...queryConfig,
  });
