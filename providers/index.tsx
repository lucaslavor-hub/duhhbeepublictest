import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { ReactNode } from 'react';
import { SessionProvider } from './auth/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tamagui } from './tamagui';
import { PortalProvider } from 'tamagui';

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider value={DefaultTheme}>
          <Tamagui>
            <PortalProvider shouldAddRootHost>{children}</PortalProvider>
          </Tamagui>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
