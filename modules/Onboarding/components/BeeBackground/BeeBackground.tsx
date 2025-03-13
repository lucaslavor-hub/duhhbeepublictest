import React from 'react';
import { Dimensions, DimensionValue } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { View } from 'tamagui';

const Hexagon = ({ x, y }: { x: DimensionValue; y: DimensionValue }) => (
  <Svg
    width="120"
    height="120"
    viewBox="0 0 512 512"
    style={{ position: 'absolute', top: y, left: x }}
  >
    <Polygon
      fill="rgba(251, 191, 0, 0.05)" // Yellow with low opacity
      points="0,121.32 184.152,15.544 368.312,121.32 368.312,332.864 184.152,438.64 0,332.864 "
    />
  </Svg>
);

export const BeeBackground = () => {
  const { width, height } = Dimensions.get('window');
  const hexagonWidth = 100;
  const hexagonHeight = 112;
  const hexagonSpacing = 0;

  const hexagons = [];
  const cols = Math.ceil(width / (hexagonWidth + hexagonSpacing));
  const rows = Math.ceil(height / (hexagonHeight * 0.75 + hexagonSpacing));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const xOffset = col * (hexagonWidth + hexagonSpacing);
      const yOffset = row * (hexagonHeight * 0.75 + hexagonSpacing);
      const isOddRow = row % 2 !== 0;

      hexagons.push(
        <Hexagon
          key={`${row}-${col}`}
          x={isOddRow ? xOffset + hexagonWidth / 2 : xOffset}
          y={yOffset}
        />,
      );
    }
  }

  return (
    <View flex={1} bg="$brandWhite" position="absolute" insetBlock={0}>
      {hexagons}
    </View>
  );
};
