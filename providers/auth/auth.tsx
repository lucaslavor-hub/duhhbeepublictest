import { useLogin } from '@/api/auth/hooks/useLogin';
import { LoginBody, Session } from '@/api/auth/types';
import { createContext, useContext } from 'react';
import { useStorageState } from './tools';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

type AuthContextProps = {
  signIn: (params: LoginBody) => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
  setSession: (session: Session | null) => void;
  isLoading: boolean;
  isPendingSignIn: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: async () => {},
  session: null,
  setSession: () => null,
  isLoading: false,
  isPendingSignIn: false,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const { mutate: login, isPending: isPendingSignIn } = useLogin();

  const signIn = async ({ identifier, password }: LoginBody) => {
    login(
      { identifier, password },
      {
        onSuccess: (data) => {
          setSession(data);
          Toast.show({
            type: 'success',
            text1: 'Successfully logged in!',
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;

          Toast.show({
            type: 'error',
            text1: 'Invalid credentials.',
            text2: message,
          });
        },
      },
    );
  };

  const signOut = async () => setSession(null);

  const value: AuthContextProps = {
    signIn,
    signOut,
    session,
    setSession,
    isLoading,
    isPendingSignIn,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}
