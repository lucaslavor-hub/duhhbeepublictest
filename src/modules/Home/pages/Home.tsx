import { Image, ScrollView, YStack } from 'tamagui';
import {
  Recommendations,
  Analysis,
  MainRecommendation,
  Welcome,
  FullProductsLine,
  TrayAgain,
} from '../components';

export const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '$brandWhite',
      }}
      showsVerticalScrollIndicator={false}
    >
      <YStack flex={1} width="100%" padding={24} gap={40}>
        <Welcome />
        <Analysis />
        <MainRecommendation />
        <Recommendations />
        <FullProductsLine />
        <TrayAgain />
      </YStack>
      <Image src={require('@/assets/images/footer-flowers.png')} width="100%" />
    </ScrollView>
  );
};
