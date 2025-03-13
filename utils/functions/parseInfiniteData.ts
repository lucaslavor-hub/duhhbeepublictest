import { ManyResponse } from '@/api/types';
import { InfiniteData } from '@tanstack/react-query';

export const parseInfiniteData = <TData extends Record<string, any>>(
  data?: InfiniteData<ManyResponse<TData>>,
): TData[] => {
  const dataInfinity = data?.pages.map((page) => page?.data?.map((item) => item) ?? []);
  const organizedData = dataInfinity?.flatMap((item) => item);

  return organizedData ?? [];
};
