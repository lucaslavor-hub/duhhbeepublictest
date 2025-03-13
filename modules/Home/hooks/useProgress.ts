import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

type UseProgressParams = {
  percentage: number;
};

export const useProgress = ({ percentage }: UseProgressParams) => {
  const [progress, setProgress] = useState<Animated.Value>(new Animated.Value(0));
  const [progressWidth, setProgressWidth] = useState<string>('0%');

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage * 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    const listenerId = progress.addListener(({ value }) => {
      setProgressWidth(`${value}%`);
    });

    return () => {
      progress.removeListener(listenerId);
    };
  }, [percentage, progress]);

  return { progress, progressWidth, setProgress };
};
