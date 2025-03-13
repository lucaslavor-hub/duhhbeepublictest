import { CustomSafeArea } from '@/components/CustomSafeArea';
import { Login } from '@/modules/Auth';
import { ImageBackground } from 'react-native';

export default function LoginScreen() {
  return (
    <ImageBackground source={require('@/assets/images/login-background.png')} style={{ flex: 1 }}>
      <CustomSafeArea style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Login />
      </CustomSafeArea>
    </ImageBackground>
  );
}
