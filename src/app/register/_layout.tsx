import { HeaderArrow } from '@/components/HeaderArrow';
import { SignUpButton } from '@/modules/Auth/components/SignUpButton';
import { SmartBeeButton } from '@/modules/Auth/components/SmartBeeButton';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function RegisterLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
        }}
      />
      <Stack.Screen
        name="terms-of-use/index"
        options={{
          title: 'Terms of Use',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
        }}
      />
      <Stack.Screen
        name="success/index"
        options={{
          title: '',
          headerLeft: () => <></>,
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
        }}
      />
      <Stack.Screen
        name="smart-bee/index"
        options={{
          title: 'AI SmartBee',
          headerLeft: () => {
            return <SmartBeeButton />;
          },
          headerStyle: {
            backgroundColor: '#F8F8F8',
          },
        }}
      />
      <Stack.Screen
        name="sign-up/index"
        options={{
          title: 'Sign Up',
          headerLeft: () => {
            return <SignUpButton />;
          },
          headerStyle: {
            backgroundColor: '#F8F8F8',
          },
        }}
      />
      <Stack.Screen
        name="face-scanning/index"
        options={{
          headerShown: true,
          title: 'Facial Scanning',
          headerLeft: () => {
            return <HeaderArrow onPress={() => router.back()} />;
          },
          headerStyle: {
            backgroundColor: '#F8F8F8',
          },
        }}
      />
    </Stack>
  );
}
