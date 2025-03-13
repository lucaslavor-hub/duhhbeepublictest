import React, { ForwardRefRenderFunction, forwardRef, ForwardedRef, ComponentProps } from 'react';
import { Input, XStack } from 'tamagui';

export type TextInputProps = {
  variant?: 'primary' | 'secondary';
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  containerProps?: ComponentProps<typeof XStack>;
} & Omit<ComponentProps<typeof Input>, 'ref'>;

const TextInputFieldBase: ForwardRefRenderFunction<Input, TextInputProps> = (
  { variant = 'primary', rightIcon, leftIcon, containerProps, ...rest },
  ref: ForwardedRef<Input>,
) => {
  return (
    <XStack
      gap={2}
      borderWidth={1}
      borderColor="#D4D4D4"
      bg={variant === 'secondary' ? '$brandGray' : 'white'}
      borderRadius={12}
      alignItems="center"
      px={12}
      py={16}
      opacity={rest.disabled ? 0.5 : 1}
      {...containerProps}
    >
      {leftIcon}
      <Input
        width="100%"
        h="$4"
        color="$brandBrown"
        placeholderTextColor="$placeholder"
        ref={ref}
        fontSize="$sm"
        borderWidth={0}
        {...rest}
      />
      {rightIcon}
    </XStack>
  );
};

export const TextInputField = forwardRef(TextInputFieldBase);
