import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { View } from 'tamagui';
import { ForgotPasswordForm } from './components';

export const ForgotPassword = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <View height={120} />
      <ForgotPasswordForm />
    </BackgroundWrapper>
  );
};
