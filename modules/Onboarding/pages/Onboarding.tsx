import { Animated, FlatList, ImageBackground, ViewToken } from 'react-native';
import { Image, View, YStack } from 'tamagui';
import { Slides, slides } from '../helpers';
import { OnboardingItem } from '../components/OnboardingItem/OnboardingItem';
import { useRef, useState } from 'react';
import { Paginator } from '../components/Paginator/Paginator';
import { HeaderArrow } from '@/components/HeaderArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export const Onboarding = () => {
  const router = useRouter();
  const slidesRef = useRef<FlatList<Slides>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const animation = useRef<LottieView>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken<Slides>[] }) => {
      setCurrentIndex(viewableItems?.[0]?.index ?? 0);
    },
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
      } catch (err) {
        console.log('Error @setItem', err);
      } finally {
        router.push('/');
      }
    }
  };

  return (
    <View bg="$brandWhite" w="100%" h="100%">
      <ImageBackground
        source={require('@/assets/images/login-background.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <YStack
          h="50%"
          w="100%"
          bg="$primary"
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
          overflow="hidden"
          justifyContent="center"
          alignContent="center"
        >
          <LottieView
            autoPlay
            ref={animation}
            source={slides[currentIndex].lottie}
            style={{ height: 360, width: 360, alignSelf: 'center' }}
          />
          <Image
            src={require('@/assets/images/onboarding-thumbnail.png')}
            h="100%"
            w="100%"
            position="absolute"
            bottom={0}
            backgroundSize="cover"
            zIndex={-1}
            scaleX={1.25}
          />
        </YStack>

        <View flex={3}>
          <FlatList
            ref={slidesRef}
            data={slides}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
            onViewableItemsChanged={viewableItemsChanged}
          />
        </View>

        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={28}
          py={20}
        >
          <Paginator data={slides} scrollX={scrollX} />

          <HeaderArrow
            antDesignProps={{
              name: 'arrowright',
            }}
            onPress={scrollTo}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
