import { ComponentProps } from 'react';
import { Avatar, View } from 'tamagui';

type CustomAvatarProps = {
  src?: string;
  avatarStatus?: boolean;
  avatarImageProps?: ComponentProps<typeof Avatar.Image>;
} & ComponentProps<typeof Avatar>;

export const CustomAvatar = ({
  src,
  avatarImageProps,
  avatarStatus = false,
  ...props
}: CustomAvatarProps) => {
  return (
    <View position="relative">
      <Avatar circular {...props}>
        <Avatar.Image src={src} {...avatarImageProps} />
        <Avatar.Fallback backgroundColor="$primary" opacity={0.75} />
      </Avatar>
      {avatarStatus && (
        <View
          borderWidth={2}
          borderColor="white"
          position="absolute"
          bottom={2}
          right={8}
          borderRadius={100}
          w={14}
          h={14}
          bg="$brandGreen"
        />
      )}
    </View>
  );
};
