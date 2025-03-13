import { ProfileButton } from '@/modules/Profile/components';
import { useSession } from '@/providers/auth';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { useUpload } from '@/api/upload/hooks/useUpload';
import { getUser } from '@/api/user';
import { CustomSheet } from '@/components/CustomSheet';
import { View } from 'tamagui';
import { SubmitButton } from '@/components/SubmitButton';
import { AxiosError } from 'axios';

export const SelectProfilePic = () => {
  const { session, setSession } = useSession();
  const { mutate: upload, isPending } = useUpload();

  const userId = session?.user.id;

  const pickImage = async ({ closeSheet }: { closeSheet: () => void }) => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      alert('Sorry, we need permission to complete this operation!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && userId) {
      const file = result.assets[0].uri;

      upload(
        {
          body: {
            field: 'profileImage',
            ref: 'plugin::users-permissions.user',
            refId: userId,
            files: file,
            jwt: session.jwt,
          },
        },
        {
          onSuccess: async () => {
            closeSheet();

            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Profile picture has been updated.',
            });

            const user = await getUser({});
            setSession({ ...session, user });
          },
          onError: (error) => {
            closeSheet();
            const axiosError = error as AxiosError<{ error: { message: string } }>;
            const message = axiosError?.response?.data?.error?.message;

            Toast.show({
              type: 'error',
              text1: 'An error occurred while updating your profile picture.',
              text2: message,
            });
          },
        },
      );
    }
  };

  return (
    <CustomSheet
      dismissOnOverlayPress={isPending ? false : true}
      trigger={({ openSheet }) => (
        <ProfileButton
          label="Profile Picture"
          onPress={openSheet}
          icon={
            <FontAwesome name="file-image-o" size={20} color="gray" style={{ opacity: 0.75 }} />
          }
        />
      )}
    >
      {({ closeSheet }) => (
        <View flex={1} padding={24}>
          <SubmitButton
            label="Pick Image"
            isLoading={isPending}
            onPress={() => pickImage({ closeSheet })}
          />
        </View>
      )}
    </CustomSheet>
  );
};
