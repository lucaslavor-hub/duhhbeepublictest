import { ComponentProps, useRef } from 'react';
import LottieView from 'lottie-react-native';
import thanking from '@/assets/lotties/thinking.lottie';

export const ThinkingAnimation = (props: Omit<ComponentProps<typeof LottieView>, 'source'>) => {
  const animation = useRef<LottieView>(null);

  return <LottieView autoPlay ref={animation} source={thanking as string} {...props} />;
};
