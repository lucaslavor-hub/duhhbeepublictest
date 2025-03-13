import axios from '@/lib/axios';
import { ReadFn } from '../types';
import { Question } from './types';

export const getQuestions: ReadFn<Question> = ({ config }) => {
  return axios.unauthorized().get('/questions', config);
};
