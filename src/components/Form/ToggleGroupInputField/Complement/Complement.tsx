import React, { useState } from 'react';
import { ButtonProps, Text, View, XStack, YStack } from 'tamagui';
import { TextInputField } from '../../TextInputField';
import { Option } from '@/types';

type ToggleGroupInputFieldProps = {
  fieldValue: string;
  onChange: (value: string) => void;
  options: Option[];
} & ButtonProps;

export const Complement = ({
  fieldValue,
  onChange,
  options,
  ...props
}: ToggleGroupInputFieldProps) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const disabled =
    selected !== options.find((option) => option.label === 'Yes (please specify)')?.value;

  return (
    <YStack gap={16}>
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
              aria-label={selected}
              borderWidth={1}
              borderColor={selected === option.value ? '$brandGold' : '$brandGray'}
              bg={selected === option.value ? '$brandGoldOpacity' : '$brandGray'}
              onPress={() => setSelected(option.value)}
              {...props}
            >
              <Text>{option.label}</Text>
            </View>
          );
        })}
      </XStack>
      <TextInputField
        bg="$brandGray"
        disabled={disabled}
        containerProps={{ bg: '$brandGray', borderWidth: 0 }}
        value={fieldValue}
        placeholder="Please specify..."
        onChangeText={onChange}
      />
    </YStack>
  );
};
