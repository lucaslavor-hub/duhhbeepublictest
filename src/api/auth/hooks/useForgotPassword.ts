import { DefaultError, useMutation } from '@tanstack/react-query';

import { forgotPasswordFn } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useForgotPassword: MutationHookFn<typeof forgotPasswordFn> = ({
  queryConfig = {},
} = {}) =>
  useMutation<
    FnReturn<typeof forgotPasswordFn>,
    DefaultError,
    Parameters<typeof forgotPasswordFn>['0'],
    DefaultError
  >({
    mutationKey: [`post:forgot-password`] as CreateMutationKey,
    mutationFn: forgotPasswordFn,
    ...queryConfig,
  });
