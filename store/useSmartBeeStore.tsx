import { Answer } from '@/api/auth/types';
import { Question } from '@/api/questions/types';
import { create } from 'zustand';

type SmartBeeStore = {
  currentStep: number;
  answers: Answer[];
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setAnswers: (answers: Answer[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStore: () => void;
};

const initialState = {
  questions: [],
  answers: [],
  currentStep: 0,
};

export const useSmartBeeStore = create<SmartBeeStore>((set) => ({
  ...initialState,
  resetStore: () => set(initialState),
  setAnswers: (answers) => set((state) => ({ ...state, answers })),
  setQuestions: (questions) =>
    set(() => ({
      questions,
      currentStep: 0,
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.questions.length - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
}));
