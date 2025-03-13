import React from 'react';
import ContentLoader from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { Rect } from 'react-native-svg';

export const MainRecommendationsFallback = () => {
  const width = Dimensions.get('window').width;
  const height = 400;

  return (
    <ContentLoader viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
      <Rect x="0" y="10" rx="8" ry="8" width="250" height="35" />
      <Rect x="0" y="55" rx="8" ry="8" width="300" height="35" />
      <Rect x="0" y="100" rx="8" ry="8" width={width - 48} height="336" />
    </ContentLoader>
  );
};
