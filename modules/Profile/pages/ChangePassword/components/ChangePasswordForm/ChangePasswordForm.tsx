import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { changePasswordSchema } from './schema';
import { FormWrapper, PasswordInputField } from '@/components/Form';
import { Form, YStack } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/SubmitButton';
import React from 'react';
import { useChangePassword } from '@/api/auth/hooks/useUpdatePassword';
import Toast from 'react-native-toast-message';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AxiosError } from 'axios';

type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data: ChangePasswordFormType) => {
    changePassword(
      {
        body: {
          currentPassword: data.currentPassword,
          password: data.newPassword,
          passwordConfirmation: data.confirmPassword,
        },
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Password updated successfully!',
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;
          Toast.show({
            type: 'error',
            text1: 'Error updating password.',
            text2: message,
          });
        },
      },
    );
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Form onSubmit={handleSubmit(onSubmit)} flex={1} justifyContent="space-between">
          <YStack flex={1} justifyContent="flex-start" gap={20}>
            <FormWrapper
              name="currentPassword"
              label="Current Password"
              labelProps={{
                fontSize: '$sm',
              }}
              error={errors.currentPassword}
            >
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInputField
                    placeholder="Enter your Password"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </FormWrapper>

            <FormWrapper
              name="newPassword"
              label="New Password"
              labelProps={{
                fontSize: '$sm',
              }}
              error={errors.newPassword}
            >
              <Controller
                name="newPassword"
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
              name="confirmPassword"
              label="Confirm Password"
              labelProps={{
                fontSize: '$sm',
              }}
              error={errors.confirmPassword}
            >
              <Controller
                name="confirmPassword"
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
    </KeyboardAwareScrollView>
  );
};
