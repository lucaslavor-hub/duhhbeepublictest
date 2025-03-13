import { DefaultError, useMutation } from '@tanstack/react-query';

import { postAddFavorite } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useAddFavorite: MutationHookFn<typeof postAddFavorite> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof postAddFavorite>,
    DefaultError,
    Parameters<typeof postAddFavorite>['0'],
    DefaultError
  >({
    mutationKey: [`post:add-favorite`] as CreateMutationKey,
    mutationFn: postAddFavorite,
    ...queryConfig,
  });
