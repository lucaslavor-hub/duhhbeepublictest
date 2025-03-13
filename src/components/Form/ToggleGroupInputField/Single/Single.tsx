import { NumberOption } from '@/types';
import { XStack, ButtonProps, Text, View } from 'tamagui';

type ToggleGroupInputFieldProps = {
  fieldValue: number;
  onChange: (value: number) => void;
  options: NumberOption[];
} & ButtonProps;

export const Single = ({ fieldValue, onChange, options, ...props }: ToggleGroupInputFieldProps) => {
  const handleSelectOption = (value: number) => {
    onChange(value);
  };

  return (
    <XStack alignItems="center" gap={16} flexWrap="wrap" justifyContent="center">
      {options?.map((option) => {
        return (
          <View
            key={option.value}
            minHeight={40}
            maxHeight={80}
            borderRadius={8}
            px={16}
            py={10}
            aria-label={option.value.toString()}
            borderWidth={1}
            borderColor={fieldValue === option.value ? '$brandGold' : '$brandGray'}
            bg={fieldValue === option.value ? '$brandGoldOpacity' : '$brandGray'}
            onPress={() => handleSelectOption(option.value)}
            {...props}
          >
            <Text>{option.label}</Text>
          </View>
        );
      })}
    </XStack>
  );
};
