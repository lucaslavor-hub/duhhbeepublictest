import { Fragment, useEffect } from 'react';
import background from '@/assets/images/background-2.png';
import { Image, View } from 'tamagui';

import { Actions } from '../components/Actions';
import { Banner } from '../components/Banner';
import { Content } from '../components/Content';
import { Dimensions } from 'react-native';
import { useProduct } from '../hooks';
import { LikeButton } from '@/components/LikeButton';
import { useNavigation } from 'expo-router';

type ProductProps = {
  id: string;
};

const screenWidth = Dimensions.get('window').width;

export const Product = ({ id }: ProductProps) => {
  const navigation = useNavigation();
  const { actionsData, bannerData, contentData, isLoading, isFavorite } = useProduct({ id });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LikeButton id={Number(id)} isFavorite={isFavorite} />;
      },
    });
  }, [navigation, id, isFavorite]);

  return (
    <View bg="$brandWhite" h="100%" justifyContent="flex-start" alignItems="center" gap={30}>
      <Image
        src={background}
        width={screenWidth}
        backgroundSize="contain"
        position="absolute"
        left={0}
        right={0}
        top={-80}
      />
      <Fragment>
        <Banner isLoading={isLoading} {...bannerData} />
        <Content isLoading={isLoading} {...contentData} />
        <Actions productId={id} isLoading={isLoading} {...actionsData} />
      </Fragment>
    </View>
  );
};
