import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react';

import { Button, ButtonProps, Spinner } from 'tamagui';

type SubmitButtonProps = {
  label: string;
  isLoading?: boolean;
} & Omit<ButtonProps, 'ref'>;

const SubmitButtonBase: ForwardRefRenderFunction<ButtonProps, SubmitButtonProps> = (
  { label, isLoading = false, ...props },
  ref: ForwardedRef<ButtonProps>,
) => {
  return (
    <Button
      width="100%"
      bg="$primary"
      color="$brandBrown"
      fontSize="$md"
      fontWeight={500}
      borderRadius={12}
      h={56}
      {...props}
    >
      {isLoading ? <Spinner size="small" color="$brandBrown" /> : label}
    </Button>
  );
};

export const SubmitButton = forwardRef(SubmitButtonBase);
