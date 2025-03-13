import { Controller, useForm } from 'react-hook-form';
import { FormWrapper, PasswordInputField, TextInputField } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { YStack, Form, XStack, Text } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CredentialsStepFormSchema } from './schema';
import { useRouter } from 'expo-router';
import { useSignUpStore } from '@/store/useSignUpStore';
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

type CredentialsStepFormType = z.infer<typeof CredentialsStepFormSchema>;

export const CredentialsStep = () => {
  const router = useRouter();
  const credentials = useSignUpStore((state) => state.credentials);
  const setCredentials = useSignUpStore((state) => state.setCredentials);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CredentialsStepFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(CredentialsStepFormSchema),
  });

  const onSubmit = (data: CredentialsStepFormType) => {
    setCredentials({ email: data.email, password: data.password });
    router.push({ pathname: '/register/face-scanning' });
  };

  useEffect(() => {
    reset({
      email: credentials?.email ?? undefined,
      password: credentials?.password ?? undefined,
      confirmPassword: credentials?.password ?? undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        flex={1}
        width="100%"
        justifyContent="flex-start"
        gap={40}
      >
        <XStack width="100%" gap={20} alignItems="center" justifyContent="flex-start">
          <Text fontWeight={600} fontSize={20} lineHeight={25}>
            Set up your credentials
          </Text>
        </XStack>

        <YStack flex={1} justifyContent="space-between">
          <YStack gap={20}>
            <FormWrapper name="email" label="E-mail" error={errors?.email}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInputField
                    variant="secondary"
                    placeholder="example@gmail.com"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </FormWrapper>

            <FormWrapper name="password" label="Password" error={errors?.password}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInputField
                    variant="secondary"
                    placeholder="*******"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </FormWrapper>

            <FormWrapper
              name="confirmPassword"
              label="Confirm Password"
              error={errors?.confirmPassword}
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInputField
                    variant="secondary"
                    placeholder="*******"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </FormWrapper>
          </YStack>

          <Form.Trigger asChild>
            <SubmitButton label="Next" />
          </Form.Trigger>
        </YStack>
      </Form>
    </TouchableWithoutFeedback>
  );
};
