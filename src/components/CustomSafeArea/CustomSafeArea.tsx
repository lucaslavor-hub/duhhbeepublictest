import { ComponentProps, ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { View } from 'tamagui';

type BackgroundWrapperProps = {
  children: ReactNode;
} & ComponentProps<typeof SafeAreaView>;

export const CustomSafeArea = ({ children, ...props }: BackgroundWrapperProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }} {...props}>
      <View flex={1} paddingHorizontal={28}>
        {children}
      </View>
    </SafeAreaView>
  );
};
