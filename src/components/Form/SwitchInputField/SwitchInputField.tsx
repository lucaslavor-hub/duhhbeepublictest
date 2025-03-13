import React from 'react';
import { Switch, XStack, Label, Separator } from 'tamagui';
import type { SizeTokens } from 'tamagui';

type CustomSwitchInputProps = {
  size: SizeTokens;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  defaultChecked?: boolean;
};

export const SwitchInputField = ({
  size,
  checked,
  onChange,
  label,
  defaultChecked,
}: CustomSwitchInputProps) => {
  const id = `switch-${size.toString().slice(1)}-${defaultChecked ?? ''}`;

  return (
    <XStack width={200} alignItems="center" gap="$4">
      <Label paddingRight="$0" minWidth={90} justifyContent="flex-end" size={size} htmlFor={id}>
        {label}
      </Label>
      <Separator minHeight={20} vertical />
      <Switch id={id} size={size} checked={checked} onCheckedChange={onChange}>
        <Switch.Thumb />
      </Switch>
    </XStack>
  );
};
