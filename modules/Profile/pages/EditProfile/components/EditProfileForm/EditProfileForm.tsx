import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CountrySelectField, DateInputField, FormWrapper, TextInputField } from '@/components/Form';
import { Form, YStack } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileFormSchema } from './schema';
import { SubmitButton } from '@/components/SubmitButton';
import React from 'react';
import { useSession } from '@/providers/auth';
import { useUpdateUser } from '@/api/user/hooks/useUpdateUser';
import Toast from 'react-native-toast-message';
import { countries } from '@/utils/mock/countries';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AxiosError } from 'axios';

type EditProfileFormType = z.infer<typeof editProfileFormSchema>;

export const EditProfileForm = () => {
  const { session, setSession } = useSession();
  const userId = session?.user.id;

  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormType>({
    mode: 'onChange',
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: session?.user.username,
      country: session?.user?.country,
      dateOfBirth: new Date(session?.user?.birthDate as string),
    },
  });

  const onSubmit = (data: EditProfileFormType) => {
    if (!userId) return;

    updateUser(
      {
        id: userId,
        body: {
          username: data.name,
          birthDate: data.dateOfBirth.toISOString(),
          country: data.country,
        },
      },
      {
        onSuccess: (response) => {
          setSession({ ...session, user: response.user });
          Toast.show({
            type: 'success',
            text1: 'Profile updated successfully!',
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;
          Toast.show({
            type: 'error',
            text1: 'Error updating profile',
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
        <Form flex={1} justifyContent="space-between" onSubmit={handleSubmit(onSubmit)}>
          <YStack gap={20}>
            <FormWrapper name="dateOfBirth" label="Birth Date" error={errors?.dateOfBirth}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DateInputField onFieldChange={field.onChange} fieldValue={field.value} />
                )}
              />
            </FormWrapper>
            <FormWrapper name="country" label="Country" error={errors?.country}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <CountrySelectField
                    value={field.value}
                    onChange={field.onChange}
                    options={countries.map((country) => ({
                      label: country.name,
                      value: country.flags.png,
                    }))}
                    placeholder="Select your country"
                  />
                )}
              />
            </FormWrapper>
            <FormWrapper name="email" label="E-mail">
              <TextInputField
                disabled
                keyboardType="email-address"
                placeholder="exemple@gmail.com"
                value={session?.user.email}
              />
            </FormWrapper>
            <FormWrapper name="name" label="Name" error={errors.name}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInputField
                    keyboardType="default"
                    placeholder="Name"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </FormWrapper>
          </YStack>

          <Form.Trigger asChild>
            <SubmitButton label="Change" isLoading={isPending} />
          </Form.Trigger>
        </Form>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
