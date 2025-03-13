import axios from '@/lib/axios';
import { ReadFn } from '../types';
import { VideoResponse } from './types';

export const getVideos: ReadFn<VideoResponse> = ({ config }) => {
  return axios.authorized().get('/videos', config);
};
