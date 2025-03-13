import { Session } from '@/api/auth/types';
import { API_URL } from '@/config';

import axiosInstance, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const config = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const unauthenticatedInstance = axiosInstance.create(config);
const authenticatedInstance = axiosInstance.create(config);

unauthenticatedInstance.interceptors.response.use(
  (response) => response?.data,
  (error: AxiosError) => Promise.reject(error),
);

authenticatedInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    if (error.response) return await Promise.reject(error);
  },
);

authenticatedInstance.interceptors.request.use(
  async (config) => {
    const session = await SecureStore.getItemAsync('session').then((value) => {
      if (!value) return null;
      return JSON.parse(value) as Session;
    });

    if (session && session.jwt) {
      config.headers.Authorization = `Bearer ${session.jwt}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default {
  unauthorized() {
    unauthenticatedInstance.defaults.baseURL = API_URL;
    return unauthenticatedInstance;
  },
  authorized() {
    authenticatedInstance.defaults.baseURL = API_URL;
    return authenticatedInstance;
  },
};
