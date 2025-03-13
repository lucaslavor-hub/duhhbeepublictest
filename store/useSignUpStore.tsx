import { create } from 'zustand';

export enum SignUpSteps {
  NAME = 'NAME',
  BIRTH = 'BIRTH',
  CREDENTIALS = 'CREDENTIALS',
}

type Credentials = {
  email: string;
  password: string;
};

type Birth = {
  birthDate: Date;
  country: string;
};

type GenericStore = {
  step: SignUpSteps;
  name: string | null;
  credentials: Credentials | null;
  birth: Birth | null;
  setName: (value: string) => void;
  setCredentials: (value: Credentials) => void;
  setBirth: (value: Birth) => void;
  setStep: (value: SignUpSteps) => void;
  resetStore: () => void;
};

const initialState = {
  step: SignUpSteps.NAME,
  name: null,
  credentials: null,
  birth: null,
};

export const useSignUpStore = create<GenericStore>()((set) => ({
  ...initialState,
  setStep: (step) => set((state) => ({ ...state, step })),
  setName: (name) => set((state) => ({ ...state, name })),
  setCredentials: (credentials) => set((state) => ({ ...state, credentials })),
  setBirth: (birth) => set((state) => ({ ...state, birth })),
  resetStore: () => set(initialState),
}));
