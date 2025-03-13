import { useAddFavorite } from '@/api/user/hooks/useAddFavorite';
import { useRemoveFavorite } from '@/api/user/hooks/useRemoveFavorite';
import { queryClient } from '@/lib/tanstack-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

type UseLikeProps = {
  id: number;
  isFavorite: boolean;
};

export const useLike = ({ id, isFavorite }: UseLikeProps) => {
  const [liked, setLiked] = useState(false);
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(liked ? 1.2 : 1, { stiffness: 150 });
    const color = interpolateColor(progress.value, [0, 1], ['#000', '#DC3412']);
    return {
      transform: [{ scale }],
      color,
    };
  }, [liked]);

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const handleLike = () => {
    setLiked(true);

    addFavorite(
      { body: { productId: id } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favorites'] });
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Successfully liked!',
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;

          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Unsuccessful like.',
            text2: message,
          });
          setLiked(false);
        },
        onSettled: () => {
          progress.value = liked ? 0 : 1;
        },
      },
    );
  };

  const handleUnlike = () => {
    setLiked(false);

    removeFavorite(
      { body: { productId: id } },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Successfully unliked!',
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ error: { message: string } }>;
          const message = axiosError?.response?.data?.error?.message;

          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Unsuccessful unlike.',
            text2: message,
          });
          setLiked(true);
        },
        onSettled: () => {
          progress.value = liked ? 0 : 1;
        },
      },
    );
  };

  useEffect(() => {
    setLiked(isFavorite);
  }, [id, isFavorite]);

  useEffect(() => {
    progress.value = liked ? 1 : 0;
  }, [liked, progress]);

  const handlePress = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  return { liked, animatedStyle, handlePress };
};
