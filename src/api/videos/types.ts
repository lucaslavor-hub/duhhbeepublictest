import { DefaultProperties } from '../types';

export type VideoResponse = DefaultProperties & {
  description: string;
  duration: string;
  postedAt: string;
  publishedAt: string;
  title: string;
  videoUrl: {
    alternativeText: string;
    caption: string;
    createdAt: string;
    ext: string;
    formats: string;
    hash: string;
    height: string;
    mime: string;
    name: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    size: number;
    updatedAt: string;
    url: string;
    width: string;
    id: number;
  };
};
