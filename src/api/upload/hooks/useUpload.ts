import { DefaultError, useMutation } from '@tanstack/react-query';

import { postUpload } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useUpload: MutationHookFn<typeof postUpload> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof postUpload>,
    DefaultError,
    Parameters<typeof postUpload>['0'],
    DefaultError
  >({
    mutationKey: [`post:upload`] as CreateMutationKey,
    mutationFn: postUpload,
    ...queryConfig,
  });
