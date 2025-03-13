import React, { ComponentProps, ReactNode } from 'react';
import { FieldError, Merge } from 'react-hook-form';
import { Text, YStack, YStackProps } from 'tamagui';

type FormWrapperProps = {
  name: string;
  label?: string;
  error?: FieldError | Merge<FieldError, unknown>;
  children: ReactNode;
  labelProps?: ComponentProps<typeof Text>;
} & YStackProps;

export const FormWrapper = ({
  name,
  label,
  labelProps,
  error,
  children,
  ...props
}: FormWrapperProps) => (
  <YStack position="relative" width="100%" alignItems="flex-start" gap={8} {...props}>
    {label && (
      <Text htmlFor={name} fontSize="$md" fontWeight={500} color="$brandBrown" {...labelProps}>
        {label}
      </Text>
    )}

    {children}
    {error?.message && (
      <Text fontSize="$xs" color="$brandRedDanger" alignSelf="flex-end">
        *{error?.message}
      </Text>
    )}
  </YStack>
);
