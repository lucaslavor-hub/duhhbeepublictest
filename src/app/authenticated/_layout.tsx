import { LogoGroup } from '@/assets/svg/logo-group';
import { TvIcon } from '@/assets/svg/tv-icon';
import { CustomAvatar } from '@/components/CustomAvatar';
import { HeaderArrow } from '@/components/HeaderArrow';
import { useSession } from '@/providers/auth';
import { Link, Stack, useRouter } from 'expo-router';

export default function AuthenticatedLayout() {
  const router = useRouter();
  const { session } = useSession();
  const profilePicture = session?.user?.profilePicture;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F8F8F8',
        },
        headerTintColor: '#352800',
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <LogoGroup />,
          headerRight: () => {
            return (
              <Link href={{ pathname: '/authenticated/profile' }}>
                <CustomAvatar src={profilePicture} size={32} />
              </Link>
            );
          },
          headerLeft: () => (
            <Link href={{ pathname: '/authenticated/videos' }}>
              <TvIcon />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="videos/index"
        options={{
          title: 'Video',
          animation: 'slide_from_left',
          headerLeft: () => {
            return <HeaderArrow onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="products/index"
        options={{
          title: 'Products',
          animation: 'slide_from_right',
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: '#352800',
          headerStyle: {
            backgroundColor: '#FBBF00',
          },
          headerLeft: () => {
            return <HeaderArrow type="secondary" onPress={() => router.back()} />;
          },
        }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </Stack>
  );
}
