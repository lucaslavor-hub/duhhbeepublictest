import { FormWrapper, TextInputField, PasswordInputField } from '@/components/Form';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Form, Text, YStack } from 'tamagui';
import { useSession } from '@/providers/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from './schema';

import { SubmitButton } from '@/components/SubmitButton';
import { z } from 'zod';

type LoginFormType = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
  const { signIn, isPendingSignIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    await signIn({ identifier: data.email, password: data.password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} flex={1} justifyContent="space-around" paddingTop={48}>
      <YStack alignItems="flex-start" gap={10}>
        <Text fontSize={28} color="$brandBrown" fontWeight={500}>
          Login
        </Text>
        <Text fontSize="$md" color="$brandBrown" lineHeight={24}>
          Fill in the fields below
        </Text>
      </YStack>
      <YStack gap={20}>
        <FormWrapper name="email" label="E-mail" error={errors.email}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInputField
                keyboardType="email-address"
                placeholder="exemple@gmail.com"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </FormWrapper>
        <YStack gap={10}>
          <FormWrapper name="password" label="Password" error={errors.password}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInputField
                  placeholder="********"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </FormWrapper>
          <Link href="/login/forgot-password" style={{ alignSelf: 'flex-end' }}>
            <Text fontSize="$sm">Forgot password?</Text>
          </Link>
        </YStack>
      </YStack>

      <YStack gap={20}>
        <Form.Trigger asChild>
          <SubmitButton label="Login" isLoading={isPendingSignIn} />
        </Form.Trigger>

        <Link href="/register" style={{ alignSelf: 'flex-start' }}>
          <Text fontSize="$sm">
            Don't have an account?{' '}
            <Text fontWeight={500} fontSize="$sm" color="$brandGold">
              Sign up
            </Text>
          </Text>
        </Link>
      </YStack>
    </Form>
  );
};
