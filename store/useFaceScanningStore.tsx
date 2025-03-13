import { SmartAIResponse } from '@/api/smartAI/types';
import { create } from 'zustand';

type FaceScanningStore = {
  scanning: SmartAIResponse | null;
  setScanning: (value: SmartAIResponse | null) => void;
  resetStore: () => void;
};

const initialState = {
  scanning: null,
};

export const useFaceScanningStore = create<FaceScanningStore>()((set) => ({
  ...initialState,
  setScanning: (scanning) => set((state) => ({ ...state, scanning })),
  resetStore: () => set(initialState),
}));
