import { AntDesign } from '@expo/vector-icons';
import { Button, Text, XStack } from 'tamagui';

export const Filters = () => {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <Text fontWeight={400} fontSize="$sm">
        Filter
      </Text>
      <Button borderRadius={100} bg="$primary" w={100} h={30}>
        <AntDesign name="filter" size={18} color="white" />
      </Button>
    </XStack>
  );
};
