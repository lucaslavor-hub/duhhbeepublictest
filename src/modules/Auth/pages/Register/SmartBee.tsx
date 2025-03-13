import { SmartBeeForm } from './components/SmartBeeForm';
import { useGetQuestions } from '@/api/questions/hooks/useQuestions';
import { useSmartBeeStore } from '@/store/useSmartBeeStore';
import { useEffect } from 'react';
import { FormSafeArea } from '@/components/FormSafeArea';
import { Spinner, View } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { useSignUpStore } from '@/store/useSignUpStore';
import { useFaceScanningStore } from '@/store/useFaceScanningStore';

export const SmartBee = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetQuestions();

  const setQuestions = useSmartBeeStore((state) => state.setQuestions);
  const resetSignUp = useSignUpStore((state) => state.resetStore);
  const resetSmartBee = useSmartBeeStore((state) => state.resetStore);
  const resetFaceScanning = useFaceScanningStore((state) => state.resetStore);

  const questions = data?.data;

  useEffect(() => {
    questions && setQuestions(questions);
  }, [data, questions, setQuestions]);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      resetSignUp();
      resetSmartBee();
      resetFaceScanning();
    });

    return () => {
      unsubscribeBlur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  if (isLoading) {
    return (
      <View bg="$brandWhite" flex={1} justifyContent="center">
        <Spinner size="small" color="$brandBrown" />
      </View>
    );
  }

  return (
    <FormSafeArea>
      <SmartBeeForm />
    </FormSafeArea>
  );
};
