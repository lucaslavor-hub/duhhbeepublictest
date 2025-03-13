import { DefaultProperties } from '../types';

export enum QuestionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  LONG = 'long',
  COMPLEMENT = 'complement',
}

export type Question = DefaultProperties & {
  question: string;
  type: QuestionType;
  options: QuestionOption[];
  order: number;
  complementSlug: string;
  publishedAt: string;
};

export type QuestionOption = {
  id: number;
  label: string;
  tags: {
    data: Tag[];
  };
};

export type Tag = {
  id: number;
  attributes: {
    type: string;
    value: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};
