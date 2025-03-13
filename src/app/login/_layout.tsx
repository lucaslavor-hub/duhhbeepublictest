import { LogoGroup } from '@/assets/svg/logo-group';
import { HeaderArrow } from '@/components/HeaderArrow';
import { Stack, useRouter } from 'expo-router';

export default function LoginLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <LogoGroup />,
          headerLeft: () => {
            return <HeaderArrow onPress={() => router.replace({ pathname: '/' })} />;
          },
        }}
      />
      <Stack.Screen
        name="reset-password/index"
        options={{
          title: 'Change password',
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="forgot-password/index"
        options={{
          title: 'Forgot password?',
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
    </Stack>
  );
}
