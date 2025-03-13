import { Answer, User } from '../auth/types';
import { DefaultProperties } from '../types';

export type FavoritesResponse = DefaultProperties & {
  clickCount: number;
  complement: string;
  composition: string;
  country: string;
  description: string;
  link: null;
  name: string;
  price: number;
  publishedAt: string;
  imageUrl: {
    name: string;
    url: string;
  };
};

export type UserBody = {
  country: string;
  username: string;
  birthDate: string;
  files?: string;
  tags?: Answer[];
  skinColor?: string;
  skinType?: string;
  acne?: string;
};

export type UserResponse = {
  user: User;
};
