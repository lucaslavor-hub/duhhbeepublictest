import { useClickProduct } from '@/api/products/hooks/useClickProduct';
import { ExternalLink } from '@/components/__expo__/ExternalLink';
import { XStack, YStack, Paragraph, Text, View } from 'tamagui';

type ActionsProps = {
  price?: number;
  link?: string;
  productId: string;
  isLoading: boolean;
};

export const Actions = ({ productId, price, link }: ActionsProps) => {
  const externalLink = link ?? '';

  const { mutate } = useClickProduct({
    queryConfig: {
      onError: () => {
        console.error('Error while counting product click');
      },
    },
  });

  const handleClick = () => mutate({ body: { id: productId } });

  return (
    <XStack
      position="absolute"
      bottom={0}
      right={0}
      left={0}
      width="100%"
      height={90}
      shadowColor="black"
      shadowOffset={{ height: 10, width: 0 }}
      shadowRadius={10}
      shadowOpacity={0.5}
    >
      <YStack padding={20} bg="white" w="50%" gap={2} justifyContent="center" alignItems="center">
        <Paragraph fontSize="$lg">Sérum</Paragraph>
        <Text fontSize={28} fontWeight={600}>
          {price?.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}
        </Text>
      </YStack>
      <ExternalLink href={externalLink} callbackFn={handleClick}>
        <View padding={20} bg="$primary" w="50%" justifyContent="center" alignItems="center">
          <Text fontSize={28} fontWeight={600}>
            SITE
          </Text>
        </View>
      </ExternalLink>
    </XStack>
  );
};
