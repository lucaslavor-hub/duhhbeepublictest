import axios from '@/lib/axios';
import { CreateFn, ReadFn, UpdateFn } from '../types';
import { FavoritesResponse, UserBody, UserResponse } from './types';
import { AxiosRequestConfig } from 'axios';
import { User } from '../auth/types';

export const getFavorites: ReadFn<FavoritesResponse> = ({ config }) => {
  return axios.authorized().get('/user/favorites', config);
};

export const postAddFavorite: CreateFn<{ productId: number }, void> = ({ body, config }) => {
  return axios.authorized().post('/user/add-favorite', body, config);
};

export const postRemoveFavorite: CreateFn<{ productId: number }, void> = ({ body, config }) => {
  return axios.authorized().post('/user/remove-favorite', body, config);
};

export const postAddHistory: CreateFn<{ productId: number }, void> = ({ body, config }) => {
  return axios.authorized().post('/user/add-history', body, config);
};

export const patchUser: UpdateFn<UserBody, UserResponse> = ({ id, body, config }) => {
  return axios.authorized().put(`/users/${id}`, body, config);
};

export const deleteUser = ({ config }: { config?: AxiosRequestConfig }): Promise<void> => {
  return axios.authorized().delete('/user/delete-me', config);
};

export const getUser = ({ config }: { config?: AxiosRequestConfig }): Promise<User> => {
  return axios.authorized().get('/users/me', config);
};
