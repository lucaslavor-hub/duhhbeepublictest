import ContentLoader from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { Rect } from 'react-native-svg';

export const AnalysisFallback = () => {
  const width = Dimensions.get('window').width;
  const height = 300;

  return (
    <ContentLoader viewBox={`0 0 ${width} ${height}`} height={height} width="100%">
      <Rect x="0" y="10" rx="8" ry="8" width="250" height="35" />
      <Rect x="0" y="55" rx="8" ry="8" width={width} height="88" />
      <Rect x="0" y="155" rx="8" ry="8" width={width} height="88" />
      <Rect x="0" y="255" rx="8" ry="8" width={width} height="88" />
    </ContentLoader>
  );
};
