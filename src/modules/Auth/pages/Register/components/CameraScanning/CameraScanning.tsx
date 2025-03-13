import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { useSmartAI } from '@/api/smartAI/hooks/useSmartAI';
import Toast from 'react-native-toast-message';
import { useNavigation, useRouter } from 'expo-router';
import { YStack, View, Text, styled, XStack } from 'tamagui';
import { HeaderArrow } from '@/components/HeaderArrow';
import { ScanningLoading } from '../ScanningLoading';
import { acneMapper } from './helper';
import { useFaceScanningStore } from '@/store/useFaceScanningStore';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';

const getBackgroundColor = (success: boolean) => {
  if (success) return '#CBDC5F';

  return '#F66F36';
};

const getBorderColor = (success: boolean) => {
  if (success) return '#8EE84D';

  return '#F7572B';
};

const getConditionMessage = (lighting: boolean, position: boolean, faceFound: boolean): string => {
  if (!faceFound) return 'No face detected.';
  if (!position) return 'Position your face in the center.';
  if (!lighting) return 'Adjust lighting for better results.';

  return 'Face detected!';
};

const CORNER_LINE_LENGTH = 50;
const CORNER_THICKNESS = 6;

const BoundingBoxContainer = styled(YStack, {
  name: 'BoundingBoxContainer',
  position: 'absolute',
  zIndex: 999,
});

const CornerLineH = styled(View, {
  position: 'absolute',
  width: CORNER_LINE_LENGTH,
  height: CORNER_THICKNESS,
  backgroundColor: '#FCC000',
  borderRadius: CORNER_THICKNESS / 2,
});

const CornerLineV = styled(View, {
  position: 'absolute',
  width: CORNER_THICKNESS,
  height: CORNER_LINE_LENGTH,
  backgroundColor: '#FCC000',
  borderRadius: CORNER_THICKNESS / 2,
});

const ConditionsContainer = styled(YStack, {
  name: 'ConditionsContainer',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  paddingTop: 32,
  paddingBottom: 64,
  backgroundColor: '#F2D668',
});

const ConditionTitle = styled(Text, {
  color: 'black',
  fontSize: 16,
});

const ConditionWrapper = styled(YStack, {
  name: 'ConditionWrapper',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
});

const ConditionBox = styled(YStack, {
  name: 'ConditionBox',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  borderWidth: 2,
});

const ConditionText = styled(Text, {
  color: 'black',
  fontSize: 16,
});

const TopTextContainer = styled(YStack, {
  name: 'TopTextContainer',
  position: 'absolute',
  top: 140,
  width: '100%',
  zIndex: 10,
  alignItems: 'center',
});

const TopText = styled(Text, {
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
  fontSize: 16,
});

export const CameraScanning = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const isPhotoValid = useRef<boolean>(false);

  const setScanning = useFaceScanningStore((state) => state.setScanning);
  const resetStore = useFaceScanningStore((state) => state.resetStore);

  const { mutate: smartAi, isPending } = useSmartAI();

  const [status, setStatus] = useState({ lighting: false, position: false, faceFound: false });

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Camera Permission', 'Camera permission is required to scan your face.');
      }
    })();
  }, []);

  const { width, height } = Dimensions.get('window');
  const boundingBoxSize = Math.min(width, height) * 0.6;

  const boundingBoxPosition = {
    left: (width - boundingBoxSize) / 2,
    top: (height - boundingBoxSize) / 2,
    width: boundingBoxSize,
    height: boundingBoxSize,
  };

  useEffect(() => {
    resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSmartAI = useCallback(
    (imagePath: string) => {
      smartAi(
        { body: { image: imagePath } },
        {
          onSuccess: (response) => {
            setScanning({
              ...response,
              predicted_class_acne: acneMapper[response.predicted_class_acne],
            });

            router.push({ pathname: '/register/smart-bee' });

            Toast.show({
              type: 'success',
              text1: 'Success scanning face',
              text2: 'Face scanned successfully',
            });
          },
          onError: (error) => {
            Toast.show({
              type: 'error',
              text1: 'Error scanning face',
              text2: error?.message,
            });
          },
          onSettled: () => {
            isPhotoValid.current = false;
          },
        },
      );
    },
    [router, setScanning, smartAi],
  );

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerTransparent: true,
      headerLeft: () => {
        if (isPending) return <></>;
        return <HeaderArrow onPress={() => router.back()} />;
      },
    });
  }, [navigation, isPending, router]);

  if (isPending) {
    return <ScanningLoading />;
  }

  const handleMessage = (event: any) => {
    try {
      if (isPhotoValid.current) return;

      const data = JSON.parse(event.nativeEvent.data);

      const { lighting, position, faceFound, image } = data;

      setStatus({ lighting, position, faceFound });

      if (lighting && position && faceFound) {
        isPhotoValid.current = true;

        setTimeout(() => {
          handleSmartAI(image);
        }, 3000);
      }
    } catch (error) {
      console.error('Error parsing message from WebView:', error);
    }
  };

  const lighting = isPhotoValid.current ?? status.lighting;
  const position = isPhotoValid.current ?? status.position;
  const faceFound = isPhotoValid.current ?? status.faceFound;

  return (
    <YStack flex={1} bg="$background">
      <TopTextContainer>
        <TopText>Position The Face In The Square</TopText>
      </TopTextContainer>

      {hasPermission && (
        <WebView
          source={{ uri: 'https://web-face-detection-gamma.vercel.app' }}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          style={{ flex: 1 }}
        />
      )}

      <BoundingBoxContainer
        style={{
          left: boundingBoxPosition.left,
          top: boundingBoxPosition.top,
          width: boundingBoxPosition.width,
          height: boundingBoxPosition.height,
        }}
      >
        <CornerLineH style={{ top: 0, left: 0 }} />
        <CornerLineV style={{ top: 0, left: 0 }} />
        <CornerLineH style={{ top: 0, right: 0 }} />
        <CornerLineV style={{ top: 0, right: 0 }} />
        <CornerLineH style={{ bottom: 0, left: 0 }} />
        <CornerLineV style={{ bottom: 0, left: 0 }} />
        <CornerLineH style={{ bottom: 0, right: 0 }} />
        <CornerLineV style={{ bottom: 0, right: 0 }} />
      </BoundingBoxContainer>

      <ConditionsContainer>
        <XStack alignItems="center" gap={6} marginBottom={16}>
          <ConditionTitle>{getConditionMessage(lighting, position, faceFound)}</ConditionTitle>
        </XStack>

        <ConditionWrapper>
          <ConditionBox
            style={{
              backgroundColor: getBackgroundColor(lighting),
              borderColor: getBorderColor(lighting),
            }}
          >
            <ConditionText>Lighting</ConditionText>
          </ConditionBox>
          <ConditionBox
            style={{
              backgroundColor: getBackgroundColor(position),
              borderColor: getBorderColor(position),
            }}
          >
            <ConditionText>Position</ConditionText>
          </ConditionBox>
          <ConditionBox
            style={{
              backgroundColor: getBackgroundColor(faceFound),
              borderColor: getBorderColor(faceFound),
            }}
          >
            <ConditionText>Face Found</ConditionText>
          </ConditionBox>
        </ConditionWrapper>
      </ConditionsContainer>
    </YStack>
  );
};
