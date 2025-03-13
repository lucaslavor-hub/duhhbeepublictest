import '@tamagui/core/reset.css';
import { ReactNode } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from '../../../tamagui.config';

export function Tamagui({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
