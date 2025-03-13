import { Audio, AVPlaybackSource } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';
import defaultSoundEffect from '@/assets/sounds/button.mp3';

type UsePlaySoundParams = {
  soundFile?: AVPlaybackSource;
};

export const usePlaySoundEffect = ({ soundFile = defaultSoundEffect }: UsePlaySoundParams) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundFile]);

  const playSound = useCallback(async () => {
    if (sound) {
      await sound.replayAsync();
    }
  }, [sound]);

  const playInBackgroundLoop = useCallback(async () => {
    if (sound) {
      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.25);
      await sound.playAsync();
    }
  }, [sound]);

  return {
    sound,
    playSound,
    playInBackgroundLoop,
  };
};
