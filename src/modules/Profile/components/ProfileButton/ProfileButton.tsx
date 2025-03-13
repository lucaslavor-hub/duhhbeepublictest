import { forwardRef, ForwardRefRenderFunction, LegacyRef } from 'react';
import { TamaguiElement, Text, XStack } from 'tamagui';

type ProfileButtonProps = {
  label: string;
  icon: JSX.Element;
  onPress?: () => void;
};

const ProfileButtonBase: ForwardRefRenderFunction<TamaguiElement, ProfileButtonProps> = (
  { label, icon, onPress },
  ref: LegacyRef<TamaguiElement>,
) => {
  return (
    <XStack
      ref={ref}
      justifyContent="flex-start"
      alignItems="center"
      gap={12}
      bg="white"
      padding={20}
      borderRadius={14}
      {...(onPress && { onPress })}
    >
      {icon}
      <Text fontSize="$md" color="$brandBrown">
        {label}
      </Text>
    </XStack>
  );
};

export const ProfileButton = forwardRef(ProfileButtonBase);
