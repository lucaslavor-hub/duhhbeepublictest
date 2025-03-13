import { View } from 'tamagui';
import { EditProfileForm } from './components';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';

export const EditProfile = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <View height={120} />
      <EditProfileForm />
    </BackgroundWrapper>
  );
};
