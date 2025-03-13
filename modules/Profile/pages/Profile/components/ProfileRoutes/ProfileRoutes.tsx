import { CustomSheet } from '@/components/CustomSheet';
import { SubmitButton } from '@/components/SubmitButton';
import { TermsDocument } from '@/modules/Auth';
import { ProfileButton } from '@/modules/Profile/components';
import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, YStack } from 'tamagui';

const routes = [
  {
    label: 'Settings',
    icon: <FontAwesome name="user-circle-o" size={20} color="gray" style={{ opacity: 0.75 }} />,
    href: 'settings',
  },
  {
    label: 'Favorites',
    icon: <FontAwesome name="heart-o" size={20} color="gray" style={{ opacity: 0.75 }} />,
    href: 'favorites',
  },
  {
    label: 'Change Password',
    icon: <Ionicons name="wallet-outline" size={20} color="gray" style={{ opacity: 0.75 }} />,
    href: 'change-password',
  },
];

export const ProfileRoutes = () => {
  const router = useRouter();

  return (
    <YStack gap={20}>
      {routes.map((route, index) => {
        return (
          <ProfileButton
            key={index}
            icon={route.icon}
            label={route.label}
            // @ts-ignore
            onPress={() => router.push(`/authenticated/profile/${route.href}`)}
          />
        );
      })}

      <CustomSheet
        snapPointsMode="percent"
        trigger={({ openSheet }) => (
          <ProfileButton
            label="Legal Policy"
            onPress={openSheet}
            icon={<Octicons name="shield-check" size={20} color="gray" style={{ opacity: 0.75 }} />}
          />
        )}
      >
        {({ closeSheet }) => (
          <ScrollView
            flex={1}
            contentContainerStyle={{
              gap: 20,
              paddingHorizontal: 24,
              paddingVertical: 56,
            }}
          >
            <TermsDocument />
            <SubmitButton label="Close" onPress={closeSheet} />
          </ScrollView>
        )}
      </CustomSheet>
    </YStack>
  );
};
