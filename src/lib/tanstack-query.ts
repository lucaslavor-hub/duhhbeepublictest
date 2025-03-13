import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryConfig: DefaultOptions = {
  queries: {
    //refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryConfig<FetcherFnType extends (...args: unknown[]) => unknown> = UseQueryOptions<
  Awaited<ReturnType<FetcherFnType>>
>;

export type MutationConfig<FetcherFnType extends (...args: unknown[]) => unknown> =
  UseMutationOptions<Awaited<ReturnType<FetcherFnType>>, AxiosError, Parameters<FetcherFnType>[0]>;
