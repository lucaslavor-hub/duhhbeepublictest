import { useAddHistory } from '@/api/user/hooks/useAddHistory';
import { Product } from '@/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';

import { YStack, Paragraph, Text, XStack } from 'tamagui';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList = ({ products }: ProductsListProps) => {
  const { mutate: addHistory } = useAddHistory();
  const router = useRouter();

  const handleRedirect = (id: number) => {
    addHistory({ body: { productId: id } });
    router.push({ pathname: `/authenticated/product/[id]`, params: { id } });
  };

  return (
    <XStack flex={1} justifyContent="center" gap={8} flexWrap="wrap">
      {products.map((item, index) => {
        return (
          <YStack
            bg="white"
            alignItems="center"
            justifyContent="space-between"
            padding={20}
            gap={20}
            height={240}
            width={160}
            borderRadius={8}
            key={`${item.id}-${index}`}
            onPress={() => handleRedirect(item.id)}
          >
            <Image
              source={item.image}
              style={{ flex: 1, height: 100, width: 100 }}
              contentFit="contain"
              transition={1000}
            />
            <YStack alignSelf="flex-start">
              <Text fontSize="$md" color="$brandBrown" fontWeight={600}>
                {item.title}
              </Text>
              <Paragraph fontSize="$sm" color="$brandBrown" opacity={0.75}>
                {item.title}
              </Paragraph>
            </YStack>

            <Text alignSelf="flex-start" fontSize="$lg" fontWeight={600} color="$brandBrown">
              {item.price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}
            </Text>
          </YStack>
        );
      })}
    </XStack>
  );
};
