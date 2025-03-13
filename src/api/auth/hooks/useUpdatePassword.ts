import { DefaultError, useMutation } from '@tanstack/react-query';

import { changePasswordFn } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useChangePassword: MutationHookFn<typeof changePasswordFn> = ({
  queryConfig = {},
} = {}) =>
  useMutation<
    FnReturn<typeof changePasswordFn>,
    DefaultError,
    Parameters<typeof changePasswordFn>['0'],
    DefaultError
  >({
    mutationKey: [`post:change-password`] as CreateMutationKey,
    mutationFn: changePasswordFn,
    ...queryConfig,
  });
