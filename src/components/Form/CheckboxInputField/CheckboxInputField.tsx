import { ComponentProps } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { type CheckboxProps } from 'tamagui';

type CheckboxInputFieldProps = {
  size?: CheckboxProps['size'];
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
} & ComponentProps<typeof BouncyCheckbox>;

export const CheckboxInputField = ({
  size = 16,
  checked,
  onChange,
  label,
  ...props
}: CheckboxInputFieldProps) => {
  return (
    <BouncyCheckbox
      size={size}
      fillColor="#FBBF00"
      unFillColor="white"
      isChecked={checked}
      text={label}
      onPress={onChange}
      textStyle={{ fontSize: 12, textDecorationLine: 'none' }}
      iconStyle={{
        borderRadius: 3,
      }}
      innerIconStyle={{
        borderRadius: 3,
      }}
      {...props}
    />
  );
};
