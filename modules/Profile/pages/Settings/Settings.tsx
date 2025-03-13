import { View } from 'tamagui';
import { SettingsRoutes } from './components/SettingsRoutes';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';

export const Settings = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <View height={140} />
      <SettingsRoutes />
    </BackgroundWrapper>
  );
};
