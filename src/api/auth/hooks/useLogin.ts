import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { loginFn } from '..';

export type CreateMutationKey = [`create:${string}`];

export const useLogin: MutationHookFn<typeof loginFn> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof loginFn>,
    DefaultError,
    Parameters<typeof loginFn>['0'],
    DefaultError
  >({
    mutationKey: [`create:login`] as CreateMutationKey,
    mutationFn: loginFn,
    ...queryConfig,
  });
