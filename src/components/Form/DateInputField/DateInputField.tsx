import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, YStack, XStack } from 'tamagui';
import { CustomSheet } from '@/components/CustomSheet';
import { Platform } from 'react-native';

type DateInputFieldProps = {
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  fieldValue: Date;
  onFieldChange: (value: Date) => void;
};

export const DateInputField = ({
  variant = 'primary',
  placeholder = 'DD/MM/YYYY',
  fieldValue,
  onFieldChange,
}: DateInputFieldProps) => {
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fieldValue;
    onFieldChange(currentDate);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <CustomSheet
      sheetScrollViewProps={{
        scrollEnabled: false,
      }}
      trigger={({ openSheet }) => (
        <XStack
          onPress={openSheet}
          bg={variant === 'secondary' ? '$brandGray' : 'white'}
          borderRadius={12}
          alignItems="center"
          borderWidth={1}
          borderColor="#D4D4D4"
          px={12}
          py={16}
        >
          <Text
            h="$4"
            width="100%"
            textAlign="left"
            color="$brandBrown"
            fontSize="$sm"
            opacity={fieldValue ? 1 : 0.5}
          >
            {!fieldValue ? placeholder : formatDate(fieldValue)}
          </Text>
        </XStack>
      )}
    >
      {({ open }) => (
        <YStack alignItems="center" padding={24}>
          {open && (
            <DateTimePicker
              value={fieldValue ?? new Date()}
              mode="date"
              textColor="#352800"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                onChange(event, selectedDate);
              }}
            />
          )}
        </YStack>
      )}
    </CustomSheet>
  );
};
