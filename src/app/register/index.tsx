import { Terms } from '@/modules/Auth';
import { Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import { Image, View } from 'tamagui';
import background2 from '@/assets/images/background-2.png';

export default function RegisterScreen() {
  const width = Dimensions.get('window').width;

  return (
    <ImageBackground source={require('@/assets/images/login-background.png')} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          src={background2}
          width={width}
          position="absolute"
          backgroundSize="contain"
          top={0}
        />
        <View flex={1} px={28}>
          <Terms />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
