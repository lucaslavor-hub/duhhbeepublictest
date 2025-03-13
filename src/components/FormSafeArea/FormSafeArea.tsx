import React, { ComponentProps, ReactNode } from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { CustomSafeArea } from '../CustomSafeArea';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export type SFormSafeAreaProps = {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
} & ComponentProps<typeof SafeAreaView>;

export const FormSafeArea: React.FC<SFormSafeAreaProps> = ({
  children,
  style,
  backgroundColor,
  ...props
}) => {
  return (
    <CustomSafeArea {...props}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </KeyboardAwareScrollView>
    </CustomSafeArea>
  );
};
