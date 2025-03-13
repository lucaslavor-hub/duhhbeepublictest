import { LogoWelcome } from '@/assets/svg/logo-welcome';
import { Image, View, YStack } from 'tamagui';
import { ImageBackground } from 'react-native';
import loginBanner from '@/assets/images/login-banner.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { WelcomeActions } from './components';

export const Welcome = () => {
  return (
    <View position="relative" flex={1} flexDir="column" w="100%" h="100%">
      <ImageBackground
        source={require('@/assets/images/login-background.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <SafeAreaView>
          <YStack justifyContent="flex-start" py={20} alignItems="center" position="relative">
            <LogoWelcome />
            <Image
              src={loginBanner}
              width="100%"
              backgroundSize="cover"
              position="absolute"
              top={-15}
            />
          </YStack>
        </SafeAreaView>

        <LinearGradient
          colors={['rgba(248, 248, 248, 0.05)', 'rgba(248, 248, 248, 1)']}
          locations={[0.4, 0.65]}
          style={{ flex: 1 }}
        >
          <WelcomeActions />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
