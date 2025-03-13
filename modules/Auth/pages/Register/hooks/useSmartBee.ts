import { useRegister } from '@/api/auth/hooks/useRegister';
import { useUpdateUser } from '@/api/user/hooks/useUpdateUser';
import { useSession } from '@/providers/auth';
import { useFaceScanningStore } from '@/store/useFaceScanningStore';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useSmartBeeStore } from '@/store/useSmartBeeStore';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export const useSmartBee = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const { name, credentials, birth } = useSignUpStore();
  const answers = useSmartBeeStore((state) => state.answers);
  const resetStore = useSmartBeeStore((state) => state.resetStore);
  const scanning = useFaceScanningStore((state) => state.scanning);

  const { mutate: register, isPending: isPendingRegister } = useRegister();
  const { mutate: update, isPending: isPendingUpdate } = useUpdateUser();

  const isPending = isPendingRegister || isPendingUpdate;

  const commonBody = {
    tags: answers,
    skinColor: scanning?.predicted_label_driboune,
    skinType: scanning?.predicted_label_dima,
    acne: scanning?.predicted_class_acne,
  };

  const onSessionSubmit = () => {
    if (!session?.user) return;

    update(
      {
        id: session?.user.id,
        body: {
          birthDate: session?.user.birthDate as string,
          country: session?.user.country as string,
          username: session?.user.username,
          ...commonBody,
        },
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Account updated successfully',
          });

          resetStore();

          queryClient.invalidateQueries({ queryKey: ['user'] });

          router.replace({ pathname: '/authenticated' });
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: error?.message,
          });
        },
      },
    );
  };

  const onRegisterSubmit = () => {
    if (!name || !credentials || !birth) return;

    const registerBody = {
      username: name,
      email: credentials?.email,
      password: credentials?.password,
      birthDate: birth?.birthDate.toISOString(),
      country: birth?.country,
      ...commonBody,
    };

    register(
      { body: registerBody },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Account created successfully',
            text2: 'You can now login',
          });

          router.replace({ pathname: '/register/success' });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;

          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: message,
          });
        },
      },
    );
  };

  const onSubmit = () => {
    if (session) {
      onSessionSubmit();
    } else {
      onRegisterSubmit();
    }
  };

  return { onSubmit, isPending };
};
