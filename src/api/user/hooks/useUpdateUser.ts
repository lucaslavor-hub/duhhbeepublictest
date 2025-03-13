import { DefaultError, useMutation } from '@tanstack/react-query';

import { patchUser } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`patch:${string}`];

export const useUpdateUser: MutationHookFn<typeof patchUser> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof patchUser>,
    DefaultError,
    Parameters<typeof patchUser>['0'],
    DefaultError
  >({
    mutationKey: [`patch:patch-user`] as CreateMutationKey,
    mutationFn: patchUser,
    ...queryConfig,
  });
