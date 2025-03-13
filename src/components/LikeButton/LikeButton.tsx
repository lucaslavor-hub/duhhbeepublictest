import { Pressable } from 'react-native';
import { View, styled } from '@tamagui/core';

import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useLike } from './hooks/useLike';

const LikeIcon = styled(Animated.createAnimatedComponent(FontAwesome), {
  color: '$color',
});

type LikeButtonProps = {
  id: number;
  isFavorite: boolean;
};

export const LikeButton = ({ id, isFavorite }: LikeButtonProps) => {
  const { handlePress, liked, animatedStyle } = useLike({ id, isFavorite });

  return (
    <Pressable onPress={handlePress}>
      <View alignItems="center" justifyContent="center" bg="white" borderRadius={100} w={40} h={40}>
        <LikeIcon size={18} name={liked ? 'heart' : 'heart-o'} style={animatedStyle} />
      </View>
    </Pressable>
  );
};
