import { DefaultError, useMutation } from '@tanstack/react-query';

import { resetPasswordFn } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useResetPassword: MutationHookFn<typeof resetPasswordFn> = ({
  queryConfig = {},
} = {}) =>
  useMutation<
    FnReturn<typeof resetPasswordFn>,
    DefaultError,
    Parameters<typeof resetPasswordFn>['0'],
    DefaultError
  >({
    mutationKey: [`post:reset-password`] as CreateMutationKey,
    mutationFn: resetPasswordFn,
    ...queryConfig,
  });
