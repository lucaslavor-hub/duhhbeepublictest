import { Video, ResizeMode } from 'expo-av';
import React, { ComponentProps, useRef } from 'react';
import { View } from 'tamagui';

type CustomPlayerProps = {
  uri: string;
} & ComponentProps<typeof Video>;

export const CustomPlayer = ({ uri, ...rest }: CustomPlayerProps) => {
  const video = useRef<Video>(null);

  return (
    <View>
      <Video
        ref={video}
        style={{ width: '100%', height: 200 }}
        source={{ uri }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        {...rest}
      />
    </View>
  );
};
