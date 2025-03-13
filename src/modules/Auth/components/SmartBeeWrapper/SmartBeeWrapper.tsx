import { ReactNode } from 'react';
import { Text, View, XStack, YStack } from 'tamagui';

type SmartBeeWrapperProps = {
  children: ReactNode;
};

export const SmartBeeWrapper = ({ children }: SmartBeeWrapperProps) => {
  return (
    <YStack flex={1} alignItems="center" justifyContent="flex-start">
      <XStack alignItems="center" my={40} py={6} px={16} borderRadius={30} gap={6} bg="$brandGray">
        <View w={9} h={9} borderRadius={100} bg="$brandGreen" />
        <Text fontSize="$xs" fontWeight={600} lineHeight={25}>
          Online
        </Text>
      </XStack>
      {children}
    </YStack>
  );
};
