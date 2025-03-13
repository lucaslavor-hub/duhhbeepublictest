import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { registerFn } from '..';

export type CreateMutationKey = [`create:${string}`];

export const useRegister: MutationHookFn<typeof registerFn> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof registerFn>,
    DefaultError,
    Parameters<typeof registerFn>['0'],
    DefaultError
  >({
    mutationKey: [`create:register`] as CreateMutationKey,
    mutationFn: registerFn,
    ...queryConfig,
  });
