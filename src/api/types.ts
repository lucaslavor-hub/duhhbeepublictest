import { AxiosRequestConfig } from 'axios';

export type DefaultProperties = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ManyResponse<TData> = {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  data: TData[];
};

export type SingleResponse<TData> = {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  data: TData;
};

export type ReadFn<TResponse> = (options: {
  config?: AxiosRequestConfig;
}) => Promise<ManyResponse<TResponse>>;

export type ReadOneFn<TResponse> = (options: {
  config?: AxiosRequestConfig;
}) => Promise<SingleResponse<TResponse>>;

export type DetailFn<TResponse> = (options: {
  id: number;
  config?: AxiosRequestConfig;
}) => Promise<SingleResponse<TResponse>>;

export type CreateFn<TBody, TResponse = TBody> = (options: {
  body: TBody;
  config?: AxiosRequestConfig;
}) => Promise<TResponse>;

export type UpdateFn<TBody, TResponse = TBody> = (options: {
  id: number;
  body: TBody;
  config?: AxiosRequestConfig;
}) => Promise<TResponse>;
