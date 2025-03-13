import { ComponentProps, useRef } from 'react';
import LottieView from 'lottie-react-native';
import hand from '@/assets/lotties/hand.lottie';

export const HandAnimation = (props: Omit<ComponentProps<typeof LottieView>, 'source'>) => {
  const animation = useRef<LottieView>(null);

  return <LottieView autoPlay ref={animation} source={hand as string} {...props} />;
};
