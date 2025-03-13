import { DefaultProperties } from '../types';

export type Tags = {
  id: number;
  acne: string | null;
  ageRange: string | null;
  allergicReactions: string | null;
  diet: string | null;
  exerciseRoutine: string | null;
  hydration: string | null;
  productRecommendation: string | null;
  skinAffectingHabits: string | null;
  skinColor: string | null;
  skinConcerns: string | null;
  skinType: string | null;
  skincareRoutine: string | null;
  sunExposure: string | null;
};

export type User = DefaultProperties & {
  name: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  profilePicture?: string;
  country?: string;
  birthDate?: string;
  tags: Tags;
};

export type Session = {
  jwt: string;
  user: User;
};

export type LoginBody = {
  identifier: string;
  password: string;
};

export type Answer = {
  question: number;
  options: (string | number)[];
};

export type RegisterBody = {
  username: string;
  birthDate: string;
  country: string;
  email: string;
  password: string;
  tags: Answer[];
  skinColor?: string;
  skinType?: string;
  acne?: string;
};

export type ResetPasswordBody = {
  password: string;
  passwordConfirmation: string;
  code: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ChangePasswordBody = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginFn = (args: LoginBody) => Promise<Session>;
