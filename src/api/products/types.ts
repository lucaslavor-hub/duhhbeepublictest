import { DefaultProperties } from '../types';

export type ProductResponse = DefaultProperties & {
  name: string;
  description: string;
  composition: string;
  country: string;
  link: string;
  clickCount: number;
  publishedAt: string;
  complement: string;
  price: number;
  isFavorite: boolean;
  imageUrl: {
    url: string;
    name: string;
  };
};
