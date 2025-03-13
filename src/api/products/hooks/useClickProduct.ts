import { DefaultError, useMutation } from '@tanstack/react-query';

import { postClickProduct } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useClickProduct: MutationHookFn<typeof postClickProduct> = ({
  queryConfig = {},
} = {}) =>
  useMutation<
    FnReturn<typeof postClickProduct>,
    DefaultError,
    Parameters<typeof postClickProduct>['0'],
    DefaultError
  >({
    mutationKey: [`post:click-product`] as CreateMutationKey,
    mutationFn: postClickProduct,
    ...queryConfig,
  });
