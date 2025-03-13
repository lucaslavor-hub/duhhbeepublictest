import { DefaultError, useMutation } from '@tanstack/react-query';

import { postSmartAI } from '..';
import { FnReturn, MutationHookFn } from '@/types/tanstack-factory';

export type CreateMutationKey = [`post:${string}`];

export const useSmartAI: MutationHookFn<typeof postSmartAI> = ({ queryConfig = {} } = {}) =>
  useMutation<
    FnReturn<typeof postSmartAI>,
    DefaultError,
    Parameters<typeof postSmartAI>['0'],
    DefaultError
  >({
    mutationKey: [`post:smart-ai`] as CreateMutationKey,
    mutationFn: postSmartAI,
    ...queryConfig,
  });
