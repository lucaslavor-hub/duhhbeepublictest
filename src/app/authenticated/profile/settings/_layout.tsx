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
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="edit-profile/index"
        options={{
          title: 'Edit Profile',
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
    </Stack>
  );
}
