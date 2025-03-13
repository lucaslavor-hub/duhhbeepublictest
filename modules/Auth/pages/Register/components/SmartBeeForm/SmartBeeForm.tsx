import { SmartBeeWrapper } from '@/modules/Auth/components/SmartBeeWrapper';

import { useSmartBeeStore } from '@/store/useSmartBeeStore';
import { Form, FormTrigger, ScrollView, Text, YStack } from 'tamagui';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SmartBeeFormSchema } from './schema';
import { SubmitButton } from '@/components/SubmitButton';
import { FormWrapper, ToggleGroupInputField } from '@/components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionType } from '@/api/questions/types';
import { useSmartBee } from '../../hooks/useSmartBee';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ThinkingAnimation } from '@/components/Animations/ThinkingAnimation';
import { usePlaySoundEffect } from '@/hooks/usePlaySoundEffect';

type SmartBeeFormType = z.infer<typeof SmartBeeFormSchema>;

export const SmartBeeForm = () => {
  const { playSound } = usePlaySoundEffect({});

  const questions = useSmartBeeStore((state) => state.questions);
  const currentStep = useSmartBeeStore((state) => state.currentStep);

  const answers = useSmartBeeStore((state) => state.answers);
  const setAnswers = useSmartBeeStore((state) => state.setAnswers);
  const nextStep = useSmartBeeStore((state) => state.nextStep);

  const { onSubmit: submitSignUp, isPending } = useSmartBee();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SmartBeeFormType>({
    mode: 'onChange',
    resolver: zodResolver(SmartBeeFormSchema),
  });

  const options = questions[currentStep]?.options;

  const type = questions[currentStep]?.type;

  const isAnimatedQuestion = type !== QuestionType.LONG;

  const questionOptions = options?.map((option) => ({
    label: option.label,
    value: option.id,
  }));

  const onSubmit = (data: SmartBeeFormType) => {
    playSound();

    const answerValue = Array.isArray(data.answer) ? data.answer : [data.answer];

    let newAnswers = [...answers];
    const index = newAnswers.findIndex((answer) => answer.question === questions[currentStep].id);

    if (index !== -1) {
      newAnswers[index] = { question: questions[currentStep].id, options: answerValue };
    } else {
      newAnswers.push({ question: questions[currentStep].id, options: answerValue });
    }

    setAnswers(newAnswers);

    if (currentStep === questions.length - 1) {
      submitSignUp();
      reset();
    } else {
      reset();
      nextStep();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SmartBeeWrapper>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Form
            flex={1}
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            justifyContent="space-between"
          >
            <YStack alignItems="center" justifyContent="center" gap={20}>
              {isAnimatedQuestion && (
                <ThinkingAnimation style={{ width: 200, height: 200, alignSelf: 'center' }} />
              )}

              <Text textAlign="center" fontSize="$xl" fontWeight={600}>
                {questions[currentStep]?.question}
              </Text>

              <ScrollView height={isAnimatedQuestion ? 180 : 400}>
                <FormWrapper name="answer" error={errors?.answer} alignItems="center">
                  {type === QuestionType.SINGLE && (
                    <Controller
                      name="answer"
                      control={control}
                      render={({ field }) => (
                        <ToggleGroupInputField.Single
                          fieldValue={field.value as number}
                          onChange={field.onChange}
                          options={questionOptions}
                        />
                      )}
                    />
                  )}

                  {type === QuestionType.LONG && (
                    <Controller
                      name="answer"
                      control={control}
                      render={({ field }) => (
                        <ToggleGroupInputField.Single
                          width="100%"
                          fieldValue={field.value as number}
                          onChange={field.onChange}
                          options={questionOptions}
                        />
                      )}
                    />
                  )}

                  {type === QuestionType.MULTIPLE && (
                    <Controller
                      name="answer"
                      defaultValue={[]}
                      control={control}
                      render={({ field }) => (
                        <ToggleGroupInputField.Multiple
                          fieldValue={field.value as number[]}
                          onChange={field.onChange}
                          options={questionOptions}
                        />
                      )}
                    />
                  )}
                </FormWrapper>
              </ScrollView>
            </YStack>

            <FormTrigger asChild>
              <SubmitButton label="Next" isLoading={isPending} />
            </FormTrigger>
          </Form>
        </TouchableWithoutFeedback>
      </SmartBeeWrapper>
    </TouchableWithoutFeedback>
  );
};
