import React from 'react';
import { useSession } from '@/providers/auth';
import { CustomSheet } from '@/components/CustomSheet';
import { Button, Text, YStack } from 'tamagui';
import { SubmitButton } from '@/components/SubmitButton';

export const SignOutSheet = () => {
  const { signOut } = useSession();
  return (
    <CustomSheet
      snapPointsMode="constant"
      trigger={({ openSheet }) => (
        <Button
          fontWeight={500}
          fontSize="$lg"
          size="$5"
          color="$brandRed"
          alignSelf="center"
          onPress={openSheet}
        >
          Log out
        </Button>
      )}
    >
      {({ closeSheet }) => (
        <YStack flex={1} padding={24} gap={20} justifyContent="center" alignItems="center">
          <Text color="$brandBrown" textAlign="center" fontWeight={700} fontSize="$sm">
            Are you sure you want to log out?
          </Text>

          <SubmitButton
            height={56}
            borderColor="$brandRedDanger"
            color="white"
            bg="$brandRedDanger"
            onPress={signOut}
            label="Confirm and log out"
          />
        </YStack>
      )}
    </CustomSheet>
  );
};
