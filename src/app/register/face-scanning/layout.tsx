import { Stack } from 'expo-router';

export default function FaceScanningLayout() {
  return (
    <Stack>
      <Stack.Screen name="camera/index" options={{ headerShown: false }} />
    </Stack>
  );
}
