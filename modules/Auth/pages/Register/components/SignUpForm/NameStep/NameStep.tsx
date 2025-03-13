import { FormWrapper, TextInputField } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Text, YStack } from 'tamagui';
import { z } from 'zod';
import { NameStepFormSchema } from './schema';
import { SignUpSteps, useSignUpStore } from '@/store/useSignUpStore';
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { FlyAnimation } from '@/components/Animations/FlyAnimation';

type NameStepFormType = z.infer<typeof NameStepFormSchema>;

export const NameStep = () => {
  const setStep = useSignUpStore((state) => state.setStep);
  const setName = useSignUpStore((state) => state.setName);
  const name = useSignUpStore((state) => state.name);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NameStepFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(NameStepFormSchema),
  });

  useEffect(() => {
    reset({ name: name ?? undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const onSubmit = (data: NameStepFormType) => {
    setName(data.name);
    setStep(SignUpSteps.BIRTH);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Form onSubmit={handleSubmit(onSubmit)} flex={1} width="100%" justifyContent="space-between">
        <FlyAnimation style={{ width: 300, height: 300, alignSelf: 'center' }} />
        <YStack gap={60}>
          <YStack>
            <Text fontSize={20} textAlign="center" lineHeight={25} fontWeight={600}>
              What do you want{'\n'} to be called?
            </Text>
          </YStack>

          <FormWrapper name="name" error={errors?.name}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInputField
                  variant="secondary"
                  placeholder="Name"
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
      </Form>
    </TouchableWithoutFeedback>
  );
};
