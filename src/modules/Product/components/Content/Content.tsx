import { stringToListFn } from '@/utils/functions/stringToListFn';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { ScrollView, Text, View, YStack } from 'tamagui';

type ContentProps = {
  description?: string;
  composition?: string;
  complement?: string;
  isLoading: boolean;
};

export const Content = ({ composition, description, complement, isLoading }: ContentProps) => {
  const formattedComposition = stringToListFn(composition);
  const formattedComplement = stringToListFn(complement);

  const height = Dimensions.get('window').height;

  if (isLoading) {
    return (
      <ContentLoader viewBox={`0 0 337 ${height}`} width={337} height={height}>
        <Rect x="0" y="0" rx="8" ry="8" width="337" height="57" />
        <Rect x="0" y="80" rx="8" ry="8" width="337" height="200" />
      </ContentLoader>
    );
  }

  return (
    <ScrollView>
      <YStack justifyContent="center" px={28} alignItems="flex-start" gap={20}>
        <Text fontSize="$md">{description}</Text>

        <YStack gap={10}>
          <Text fontSize="$lg" fontWeight={600}>
            Composition
          </Text>
          <YStack gap={10}>
            {formattedComposition?.map((item, index) => (
              <Text key={index} fontSize="$md">
                {index + 1}. {item}
              </Text>
            ))}
          </YStack>
        </YStack>

        <YStack gap={10}>
          <Text fontSize="$lg" fontWeight={600}>
            Complementary
          </Text>
          <YStack gap={10}>
            {formattedComplement?.map((item, index) => (
              <Text key={index} fontSize="$md">
                {index + 1}. {item}
              </Text>
            ))}
          </YStack>
        </YStack>
      </YStack>
      <View h={150} />
    </ScrollView>
  );
};
