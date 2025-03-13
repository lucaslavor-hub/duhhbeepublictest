import { View, YStack } from 'tamagui';
import { UserInfo } from './components/UserInfo';
import { ProfileRoutes } from './components/ProfileRoutes';

import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import { SignOutSheet } from './components/SignOutSheet';

export const Profile = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -80 }}>
      <YStack flex={1} justifyContent="flex-start" gap={40}>
        <View />
        <UserInfo />
        <ProfileRoutes />
      </YStack>
      <SignOutSheet />
    </BackgroundWrapper>
  );
};
