import { SmartBee } from '@/modules/Auth';
import { SmartBeeButton } from '@/modules/Auth/components/SmartBeeButton';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function SmartAI() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'AI SmartBee',
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: '#F8F8F8',
      },
      headerLeft: () => {
        return <SmartBeeButton />;
      },
    });
  }, [navigation]);

  return <SmartBee />;
}
