import axios from '@/lib/axios';
import { ReadOneFn } from '../types';
import { ConfigResponse } from './types';

export const getConfiguration: ReadOneFn<ConfigResponse> = ({ config }) => {
  return axios.authorized().get('/configuration', config);
};
