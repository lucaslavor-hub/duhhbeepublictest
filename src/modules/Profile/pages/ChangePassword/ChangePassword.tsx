import { View } from 'tamagui';
import { ChangePasswordForm } from './components';
import { BackgroundWrapper } from '@/components/BackgroundWrapper';
import React from 'react';

export const ChangePassword = () => {
  return (
    <BackgroundWrapper style={{ flex: 1 }} imageProps={{ top: -120 }}>
      <View height={120} />
      <ChangePasswordForm />
    </BackgroundWrapper>
  );
};
