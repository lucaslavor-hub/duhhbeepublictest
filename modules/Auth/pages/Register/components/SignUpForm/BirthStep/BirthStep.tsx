import { Controller, useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { YStack, Form, XStack, Text } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BirthStepFormSchema } from './schema';
import { SignUpSteps, useSignUpStore } from '@/store/useSignUpStore';
import { useEffect } from 'react';
import { DateInputField } from '@/components/Form';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { countries } from '@/utils/mock/countries';
import { CountrySelectField } from '@/components/Form/CountrySelectField';

type BirthStepFormType = z.infer<typeof BirthStepFormSchema>;

export const BirthStep = () => {
  const birth = useSignUpStore((state) => state.birth);
  const setBirth = useSignUpStore((state) => state.setBirth);
  const setStep = useSignUpStore((state) => state.setStep);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BirthStepFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(BirthStepFormSchema),
  });

  const onSubmit = (data: BirthStepFormType) => {
    setBirth(data);
    setStep(SignUpSteps.CREDENTIALS);
  };

  useEffect(() => {
    reset({
      birthDate: birth?.birthDate ?? undefined,
      country: birth?.country ?? undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Form onSubmit={handleSubmit(onSubmit)} flex={1} width="100%" justifyContent="space-between">
        <YStack flex={1} alignItems="center" gap={40}>
          <XStack width="100%" gap={20} alignItems="center" justifyContent="flex-start">
            <Text fontWeight={600} fontSize={20} lineHeight={25}>
              What is your date of birth?
            </Text>
          </XStack>
          <YStack gap={20}>
            <FormWrapper name="birthDate" label="Birth Date" error={errors?.birthDate}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DateInputField
                    variant="secondary"
                    onFieldChange={field.onChange}
                    fieldValue={field.value}
                  />
                )}
              />
            </FormWrapper>
            <FormWrapper name="country" label="Country" error={errors?.country}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <CountrySelectField
                    variant="secondary"
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
          </YStack>
        </YStack>

        <Form.Trigger asChild>
          <SubmitButton label="Next" />
        </Form.Trigger>
      </Form>
    </TouchableWithoutFeedback>
  );
};
