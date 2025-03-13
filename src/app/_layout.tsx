import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';
import { onAppStateChange } from '@/utils/functions/onAppStateChange';
import { GlobalProvider } from '@/providers';

import backgroundSoundEffect from '@/assets/sounds/background-sound.mp3';

import {
  useFonts,
  Cabin_400Regular,
  Cabin_700Bold,
  Hind_400Regular,
  Hind_700Bold,
} from '@expo-google-fonts/dev';
import { useSession } from '@/providers/auth';
import { usePlaySoundEffect } from '@/hooks/usePlaySoundEffect';

SplashScreen.preventAutoHideAsync();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

function InitialLayout() {
  const router = useRouter();
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const { playInBackgroundLoop } = usePlaySoundEffect({ soundFile: backgroundSoundEffect });

  const [loaded] = useFonts({
    Cabin: Cabin_400Regular,
    Hindi: Hind_400Regular,
    CabinBold: Cabin_700Bold,
    HindiBold: Hind_700Bold,
  });

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded && !loading) {
      playInBackgroundLoop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, loading]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();

      if (session) {
        router.replace('/authenticated');
        return;
      }

      if (!viewedOnboarding) {
        router.replace('/onboarding');
        return;
      }

      router.replace({ pathname: '/' });
    }
  }, [loaded, loading, router, session, viewedOnboarding]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="authenticated" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}

const RootLayoutNav = () => {
  return (
    <GlobalProvider>
      <InitialLayout />
      <Toast position="top" bottomOffset={20} />
    </GlobalProvider>
  );
};

export default RootLayoutNav;
