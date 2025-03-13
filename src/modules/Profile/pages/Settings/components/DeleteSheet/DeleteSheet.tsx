import { useDeleteUser } from '@/api/user/hooks/useDeleteUser';
import { CustomSheet } from '@/components/CustomSheet';
import { useSession } from '@/providers/auth';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Text, YStack } from 'tamagui';
import { ProfileButton } from '@/modules/Profile/components';
import { SubmitButton } from '@/components/SubmitButton';
import React from 'react';
import { AxiosError } from 'axios';

export const DeleteSheet = () => {
  const { signOut } = useSession();
  const { mutate: deleteUser, isPending } = useDeleteUser({
    queryConfig: {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your account has been deleted.',
        });
        signOut();
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ error: { message: string } }>;
        const message = axiosError?.response?.data?.error?.message;
        Toast.show({
          type: 'error',
          text1: 'An error occurred while deleting your account.',
          text2: message,
        });
      },
    },
  });

  const handleDelete = () => deleteUser({});

  return (
    <CustomSheet
      dismissOnOverlayPress={isPending ? false : true}
      snapPointsMode="constant"
      trigger={({ openSheet }) => (
        <ProfileButton
          label="Delete Account"
          onPress={openSheet}
          icon={
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="gray"
              style={{ opacity: 0.75 }}
            />
          }
        />
      )}
    >
      {({ closeSheet }) => (
        <YStack flex={1} padding={24} gap={20} justifyContent="center" alignItems="center">
          <YStack alignItems="center">
            <Text color="$brandBrown" textAlign="center" fontWeight={700} fontSize="$sm">
              Are you sure you want to delete your account?
            </Text>
            <Text color="$brandRedDanger" fontWeight="600">
              This action is irreversible.
            </Text>
          </YStack>

          <SubmitButton
            height={56}
            borderColor="$brandRedDanger"
            color="white"
            bg="$brandRedDanger"
            onPress={handleDelete}
            isLoading={isPending}
            label="Delete"
          />
        </YStack>
      )}
    </CustomSheet>
  );
};
