import { FormWrapper, TextInputField } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Form, YStack, Text } from 'tamagui';
import { z } from 'zod';
import { ForgotPasswordFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@/api/auth/hooks/useForgotPassword';
import Toast from 'react-native-toast-message';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    queryConfig: {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Check your email to reset your password',
        });

        router.push('/login/reset-password');
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      },
    },
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    forgotPassword({ body: data });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Form onSubmit={handleSubmit(onSubmit)} flex={1} justifyContent="space-between">
        <YStack gap={32}>
          <Text fontSize="$sm" color="$brandBrown" width="80%">
            Enter your email address below. We will send you a link to reset your password.
          </Text>

          <FormWrapper name="email" label="Email" error={errors?.email}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInputField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="exemplo@hotmail.com"
                />
              )}
            />
          </FormWrapper>

          <Text fontSize="$sm" color="$brandBrown">
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#BB6B14' }}>
              Sign up
            </Link>
          </Text>
        </YStack>

        <Form.Trigger asChild>
          <SubmitButton label="Change Password" isLoading={isPending} />
        </Form.Trigger>
      </Form>
    </TouchableWithoutFeedback>
  );
};
