import React, { ComponentProps } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'tamagui';

type HeaderArrowProps = {
  type?: 'primary' | 'secondary';
  antDesignProps?: ComponentProps<typeof AntDesign>;
} & ComponentProps<typeof Button>;

export const HeaderArrow = ({ type = 'primary', antDesignProps, ...props }: HeaderArrowProps) => {
  return (
    <Button
      bg={type === 'primary' ? '$primary' : 'white'}
      borderRadius={100}
      w={40}
      h={40}
      {...props}
    >
      <AntDesign name="arrowleft" size={18} color="black" {...antDesignProps} />
    </Button>
  );
};
