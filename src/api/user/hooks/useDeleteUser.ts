import { DefaultError, useMutation } from '@tanstack/react-query';

import { deleteUser } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`delete:${string}`];

export const useDeleteUser: MutationHookFn<typeof deleteUser> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof deleteUser>,
    DefaultError,
    Parameters<typeof deleteUser>['0'],
    DefaultError
  >({
    mutationKey: [`delete:patch-user`] as CreateMutationKey,
    mutationFn: deleteUser,
    ...queryConfig,
  });
