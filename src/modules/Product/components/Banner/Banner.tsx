import { Image } from 'expo-image';
import ContentLoader from 'react-content-loader/native';
import { Rect } from 'react-native-svg';
import { YStack, Paragraph, View, Text } from 'tamagui';

type BannerProps = {
  title?: string;
  image?: string;
  isLoading: boolean;
};

export const Banner = ({ title, image, isLoading }: BannerProps) => {
  return (
    <YStack justifyContent="flex-start" alignItems="center" marginTop={24} gap={20}>
      <View
        bg="white"
        borderRadius={20}
        padding={40}
        shadowColor="$primary"
        shadowOffset={{ width: 0, height: 20 }}
        shadowOpacity={0.2}
        shadowRadius={10}
      >
        <Image source={image} style={{ width: 140, height: 180 }} contentFit="contain" />
      </View>

      {isLoading ? (
        <ContentLoader viewBox={`0 0 337 80`} width={337} height={80}>
          <Rect x="80" y="0" rx="8" ry="8" width="180" height="40" />
          <Rect x="120" y="50" rx="8" ry="8" width="100" height="40" />
        </ContentLoader>
      ) : (
        <YStack gap={10} justifyContent="center" alignItems="center">
          <Text fontSize={28} fontWeight={600} color="$brandBrown">
            {title}
          </Text>
          <Paragraph fontSize="$sm">Face oil</Paragraph>
        </YStack>
      )}
    </YStack>
  );
};
