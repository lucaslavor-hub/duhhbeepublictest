import { CustomAvatar } from '@/components/CustomAvatar';
import { useSession } from '@/providers/auth';
import { YStack, Text } from 'tamagui';

export const UserInfo = () => {
  const { session } = useSession();

  const email = session?.user.email;
  const name = session?.user.username;
  const profilePicture = session?.user?.profilePicture;

  return (
    <YStack justifyContent="center" alignItems="center" gap={20}>
      <CustomAvatar
        src={profilePicture}
        size={80}
        borderWidth={2}
        borderColor="white"
        avatarStatus
      />

      <YStack alignItems="center" justifyContent="center" gap={6}>
        <Text fontSize="$xl" color="$brandBrown">
          {name}
        </Text>
        <Text fontSize="$sm" color="$brandBrown">
          {email}
        </Text>
      </YStack>
    </YStack>
  );
};
