import React, { useState, ForwardRefRenderFunction, forwardRef, ForwardedRef } from 'react';
import { Input, XStack } from 'tamagui';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type PasswordInputProps = {
  variant?: 'primary' | 'secondary';
  containerProps?: React.ComponentProps<typeof XStack>;
} & Omit<RNTextInputProps, 'ref'>;

export const PasswordInputFieldBase: ForwardRefRenderFunction<Input, PasswordInputProps> = (
  { variant = 'primary', containerProps, ...rest },
  ref: ForwardedRef<Input>,
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderColor="#D4D4D4"
      bg={variant === 'secondary' ? '$brandGray' : 'white'}
      borderRadius={12}
      px={12}
      py={16}
      {...containerProps}
    >
      <Input
        ref={ref}
        h="$4"
        width="100%"
        borderWidth={0}
        fontSize="$sm"
        placeholderTextColor="$placeholder"
        color="$brandBrown"
        secureTextEntry={!isPasswordVisible}
        {...rest}
      />
      <MaterialIcons
        size={16}
        style={{ position: 'absolute', right: 14 }}
        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
        onPress={togglePasswordVisibility}
      />
    </XStack>
  );
};

export const PasswordInputField = forwardRef(PasswordInputFieldBase);
