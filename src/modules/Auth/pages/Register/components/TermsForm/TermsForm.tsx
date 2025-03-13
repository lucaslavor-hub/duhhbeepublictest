import { CheckboxInputField, FormWrapper } from '@/components/Form';
import { SubmitButton } from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Form, ScrollView, Text, XStack, YStack } from 'tamagui';
import { z } from 'zod';
import { TermsFormSchema } from './schema';
import { useRouter } from 'expo-router';
import { HandAnimation } from '@/components/Animations/HandAnimation';
import { CustomSheet } from '@/components/CustomSheet';
import { TermsDocument } from '../../TermsDocument';
import { usePlaySoundEffect } from '@/hooks/usePlaySoundEffect';

type TermsFormType = z.infer<typeof TermsFormSchema>;

export const TermsForm = () => {
  const router = useRouter();
  const { playSound } = usePlaySoundEffect({});
  const { control, handleSubmit } = useForm<TermsFormType>({
    mode: 'onChange',
    resolver: zodResolver(TermsFormSchema),
  });

  const onSubmit = (data: TermsFormType) => {
    if (data.terms) {
      playSound();
      router.push({ pathname: '/register/sign-up' });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} flex={1} justifyContent="space-between">
      <HandAnimation style={{ height: 360, width: 360, alignSelf: 'center' }} />
      <YStack gap={24}>
        <Text fontSize={28} lineHeight={34} color="$brandBrown">
          Hi! My name is <Text fontWeight={600}>DuhhBee</Text>.{'\n'}I’m here to help you!
        </Text>

        <Text fontSize="$sm" lineHeight={22} color="$brandBrown">
          DuhhBee is an app powered by advanced AI and the expertise of beauty professionals,
          offering personalized skincare recommendations for your specific skin type. Achieve your
          skincare goals with tailored advice. For any medical concerns, please consult a
          professional.
        </Text>

        <FormWrapper name="terms">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <XStack gap={10}>
                <CheckboxInputField disableText onChange={field.onChange} checked={field.value} />
                <CustomSheet
                  snapPointsMode="percent"
                  trigger={({ openSheet }) => (
                    <Text fontWeight={600} onPress={openSheet}>
                      I have read and agree to the{' '}
                      <Text
                        fontWeight={700}
                        textDecorationColor="$brandBrown"
                        textDecorationLine="underline"
                        textDecorationStyle="solid"
                      >
                        Terms of Use.
                      </Text>
                    </Text>
                  )}
                >
                  {({ closeSheet }) => (
                    <ScrollView
                      flex={1}
                      contentContainerStyle={{
                        gap: 20,
                        paddingHorizontal: 24,
                        paddingVertical: 56,
                      }}
                    >
                      <TermsDocument />
                      <SubmitButton label="Close" onPress={closeSheet} />
                    </ScrollView>
                  )}
                </CustomSheet>
              </XStack>
            )}
          />
        </FormWrapper>
      </YStack>

      <Form.Trigger asChild>
        <SubmitButton label="Next" />
      </Form.Trigger>
    </Form>
  );
};
