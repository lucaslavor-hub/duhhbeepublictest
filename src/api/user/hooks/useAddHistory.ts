import { DefaultError, useMutation } from '@tanstack/react-query';

import { postAddHistory } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useAddHistory: MutationHookFn<typeof postAddHistory> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof postAddHistory>,
    DefaultError,
    Parameters<typeof postAddHistory>['0'],
    DefaultError
  >({
    mutationKey: [`post:add-history`] as CreateMutationKey,
    mutationFn: postAddHistory,
    ...queryConfig,
  });
