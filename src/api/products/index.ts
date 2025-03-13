import axios from '@/lib/axios';
import { CreateFn, DetailFn, ReadFn, ReadOneFn } from '../types';
import { ProductResponse } from './types';

export const getProducts: ReadFn<ProductResponse> = ({ config }) => {
  return axios.authorized().get('/products', config);
};

export const getRecommendedProducts: ReadFn<ProductResponse> = ({ config }) => {
  return axios.authorized().get('/products-recommendations', config);
};

export const getProduct: DetailFn<ProductResponse> = ({ id, config }) => {
  return axios.authorized().get(`/products/${id}`, config);
};

export const postClickProduct: CreateFn<{ id: string }, void> = ({ body, config }) => {
  return axios.authorized().post('/products/click', { productId: body.id }, config);
};

export const getMatchingProduct: ReadOneFn<ProductResponse> = ({ config }) => {
  return axios.authorized().get('/products-matching-kit', config);
};
