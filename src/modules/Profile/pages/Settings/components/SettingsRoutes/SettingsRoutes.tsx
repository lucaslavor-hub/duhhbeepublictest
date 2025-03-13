import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YStack } from 'tamagui';
import { DeleteSheet } from '../DeleteSheet';
import { SelectProfilePic } from '../SelectProfilePic/SelectProfilePic';
import { ProfileButton } from '@/modules/Profile/components';

export const SettingsRoutes = () => {
  const router = useRouter();

  return (
    <YStack gap={20}>
      <SelectProfilePic />
      <ProfileButton
        label="Edit Profile"
        icon={<FontAwesome name="edit" size={20} color="gray" style={{ opacity: 0.75 }} />}
        onPress={() => router.push('/authenticated/profile/settings/edit-profile')}
      />
      <DeleteSheet />
    </YStack>
  );
};
