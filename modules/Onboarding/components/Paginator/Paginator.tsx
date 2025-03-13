import { Animated, StyleSheet } from 'react-native';
import { View, getToken, useWindowDimensions } from 'tamagui';

type PaginatorProps = {
  data: unknown[];
  scrollX: Animated.Value;
};

export const Paginator = ({ data, scrollX }: PaginatorProps) => {
  const { width } = useWindowDimensions();

  return (
    <View flexDirection="row">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [getToken('$brandGray'), getToken('$brandGold'), getToken('$brandGray')],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                backgroundColor: dotColor,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginHorizontal: 4,
  },
});
