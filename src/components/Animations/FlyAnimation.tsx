import { ComponentProps, useRef } from 'react';
import fly from '@/assets/lotties/fly.lottie';
import LottieView from 'lottie-react-native';

export const FlyAnimation = (props: Omit<ComponentProps<typeof LottieView>, 'source'>) => {
  const animation = useRef<LottieView>(null);

  return <LottieView autoPlay ref={animation} source={fly as string} {...props} />;
};
