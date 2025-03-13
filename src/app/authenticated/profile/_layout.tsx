import { HeaderArrow } from '@/components/HeaderArrow';
import { Stack, router } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FBBF00',
        },
        headerTintColor: '#352800',
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="favorites/index"
        options={{
          title: 'Favorites',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="change-password/index"
        options={{
          title: 'Change Password',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
    </Stack>
  );
}
