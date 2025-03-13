import { ComponentProps, useRef } from 'react';
import LottieView from 'lottie-react-native';
import laf from '@/assets/lotties/laf.lottie';

export const LafAnimation = (props: Omit<ComponentProps<typeof LottieView>, 'source'>) => {
  const animation = useRef<LottieView>(null);

  return <LottieView autoPlay ref={animation} source={laf as string} {...props} />;
};
