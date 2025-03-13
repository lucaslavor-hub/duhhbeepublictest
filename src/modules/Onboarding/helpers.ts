import hand from '@/assets/lotties/hand.lottie';
import dance from '@/assets/lotties/dance.lottie';
import { AnimationObject } from 'lottie-react-native';

export type Slides = {
  id: string;
  title: string;
  description: string;
  lottie: string | AnimationObject;
};

export const slides: Slides[] = [
  {
    id: '1',
    title: 'DuhhBee Has Arrived!',
    description:
      'From space to your skincare routine. Discover a new way to care for your skin with the help of a unique artificial intelligence.',
    lottie: hand as string,
  },
  {
    id: '2',
    title: 'Recommendations for Your Skin',
    description:
      'Based on your needs and preferences, DuhhBee analyzes everything to suggest the best skincare products. Say goodbye to uncertainty and care for your skin with confidence.',
    lottie: dance as string,
  },
  {
    id: '3',
    title: 'Easy, Smart, Efficient',
    description:
      'Find the ideal products and learn how to care for your skin in a simple and direct way. DuhhBee is here to guide you every step of the way.',
    lottie: hand as string,
  },
];
