import { DefaultError, useMutation } from '@tanstack/react-query';

import { postRemoveFavorite } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useRemoveFavorite: MutationHookFn<typeof postRemoveFavorite> = ({
  queryConfig = {},
} = {}) =>
  useMutation<
    FnReturn<typeof postRemoveFavorite>,
    DefaultError,
    Parameters<typeof postRemoveFavorite>['0'],
    DefaultError
  >({
    mutationKey: [`post:remove-favorite`] as CreateMutationKey,
    mutationFn: postRemoveFavorite,
    ...queryConfig,
  });
