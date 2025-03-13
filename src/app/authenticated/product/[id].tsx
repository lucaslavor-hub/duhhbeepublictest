import { HeaderArrow } from '@/components/HeaderArrow';
import { Product } from '@/modules/Product';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      title: 'Product',
      headerStyle: {
        backgroundColor: '#FBBF00',
      },
      headerLeft: () => {
        return <HeaderArrow type="secondary" onPress={() => router.back()} />;
      },
    });
  }, [navigation, id]);

  return <Product id={id as string} />;
}
