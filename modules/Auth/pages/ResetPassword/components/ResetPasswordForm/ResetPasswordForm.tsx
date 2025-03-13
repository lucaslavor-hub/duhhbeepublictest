import { FormWrapper, PasswordInputField, TextInputField } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { Form, YStack } from 'tamagui';
import { z } from 'zod';
import { ResetPasswordSchema } from './schema';
import { useResetPassword } from '@/api/auth/hooks/useResetPassword';
import { useRouter } from 'expo-router';
import { Mask } from '@/utils/functions/mask';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AxiosError } from 'axios';

type ResetPasswordFormType = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormType) => {
    resetPassword(
      {
        body: {
          code: data.code,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        },
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Password changed successfully!',
          });

          router.replace('/login');
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;
          Toast.show({
            type: 'error',
            text1: 'Error changing password.',
            text2: message,
          });
        },
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Form onSubmit={handleSubmit(onSubmit)} flex={1} justifyContent="space-between">
        <YStack flex={1} justifyContent="flex-start" gap={20}>
          <FormWrapper
            name="code"
            label="Code"
            labelProps={{
              fontSize: '$sm',
            }}
            error={errors.code}
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextInputField
                  placeholder="Enter code"
                  value={field.value}
                  keyboardType="numeric"
                  onChangeText={(event) => {
                    event = Mask.code(event);
                    field.onChange(event);
                  }}
                />
              )}
            />
          </FormWrapper>

          <FormWrapper
            name="password"
            label="New Password"
            labelProps={{
              fontSize: '$sm',
            }}
            error={errors.password}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInputField
                  placeholder="Enter New Password"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </FormWrapper>

          <FormWrapper
            name="passwordConfirmation"
            label="Confirm New Password"
            labelProps={{
              fontSize: '$sm',
            }}
            error={errors.passwordConfirmation}
          >
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field }) => (
                <PasswordInputField
                  placeholder="Confirm New Password"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </FormWrapper>
        </YStack>

        <Form.Trigger asChild>
          <SubmitButton label="Change Password" isLoading={isPending} />
        </Form.Trigger>
      </Form>
    </TouchableWithoutFeedback>
  );
};
