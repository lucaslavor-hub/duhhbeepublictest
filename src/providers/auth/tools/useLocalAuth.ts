import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

type UseLocalAuthReturn = {
  isAuthenticated: boolean;
  isCompatible: boolean;
  handleAuthentication: () => Promise<void>;
};

export const useLocalAuth = (): UseLocalAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCompatible, setIsCompatible] = useState(false);

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsCompatible(compatible);
  }

  const platformMessages =
    Platform.OS === 'ios'
      ? {
          notEnrolled: 'Face recognition not enrolled',
          promptMessage: 'Login with Face ID',
          fallbackLabel: 'Cancel login with Face ID',
        }
      : {
          notEnrolled: 'Fingerprint not enrolled',
          promptMessage: 'Login with fingerprint',
          fallbackLabel: 'Cancel login with fingerprint',
        };

  async function handleAuthentication() {
    const isLocalAuthEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isLocalAuthEnrolled) {
      return Alert.alert('Login', platformMessages.notEnrolled);
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: platformMessages.promptMessage,
      fallbackLabel: platformMessages.fallbackLabel,
    });

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  return {
    isAuthenticated,
    isCompatible,
    handleAuthentication,
  };
};
