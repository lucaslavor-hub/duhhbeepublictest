import axios from '@/lib/axios';
import {
  ChangePasswordBody,
  ForgotPasswordBody as FPBody,
  LoginFn,
  RegisterBody,
  ResetPasswordBody,
  Session,
  User,
} from './types';
import { CreateFn } from '../types';

export const loginFn: LoginFn = ({ identifier, password }) => {
  return axios.unauthorized().post('/auth/local', { identifier, password });
};

export const registerFn: CreateFn<RegisterBody> = ({ body, config }) => {
  return axios.unauthorized().post('/auth/local/register', body, config);
};

export const changePasswordFn: CreateFn<ChangePasswordBody, User> = ({ body, config }) => {
  return axios.authorized().post('/auth/change-password', body, config);
};

export const resetPasswordFn: CreateFn<ResetPasswordBody, Session> = ({ body, config }) => {
  return axios.unauthorized().post('/auth/reset-password', body, config);
};

export const forgotPasswordFn: CreateFn<FPBody> = ({ body, config }) => {
  return axios.unauthorized().post('/auth/forgot-password', body, config);
};
