import { ComponentProps, useRef } from 'react';
import LottieView from 'lottie-react-native';
import dance from '@/assets/lotties/dance.lottie';

export const DanceAnimation = (props: Omit<ComponentProps<typeof LottieView>, 'source'>) => {
  const animation = useRef<LottieView>(null);

  return <LottieView autoPlay ref={animation} source={dance} {...props} />;
};
