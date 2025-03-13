import { ComponentProps, ReactNode } from 'react';
import { Image } from 'tamagui';
import background1 from '@/assets/images/background.png';
import background2 from '@/assets/images/background-2.png';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomSafeArea } from '../CustomSafeArea';

const screenWidth = Dimensions.get('window').width;

const backgroundImage: Record<number, any> = {
  1: background1,
  2: background2,
};

type BackgroundWrapperProps = {
  bgImage?: 1 | 2;
  imageProps?: ComponentProps<typeof Image>;
  children: ReactNode;
} & ComponentProps<typeof SafeAreaView>;

export const BackgroundWrapper = ({
  bgImage = 1,
  imageProps,
  children,
  ...props
}: BackgroundWrapperProps) => {
  return (
    <CustomSafeArea {...props}>
      <Image
        src={backgroundImage[bgImage]}
        width={screenWidth}
        position="absolute"
        top={0}
        {...imageProps}
      />
      {children}
    </CustomSafeArea>
  );
};
