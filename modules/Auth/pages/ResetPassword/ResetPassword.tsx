import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { ResetPasswordForm } from './components';
import { View } from 'tamagui';

export const ResetPassword = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <View height={120} />
      <ResetPasswordForm />
    </BackgroundWrapper>
  );
};
