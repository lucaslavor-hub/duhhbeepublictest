import {
  AuthRequest,
  AuthRequestConfig,
  AuthRequestPromptOptions,
  AuthSessionRedirectUriOptions,
  AuthSessionResult,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

/*
GitHub
Reddit
Okta
Spotify
Strava
Twitch
Twitter
Uber

apple
google
linkedin
instagram
facebook
*/

type UseSocialAuthParams = {
  clientId: string;
  authorizationEndpoint: string;
  redirectUri: AuthSessionRedirectUriOptions;
  scopes: string[];
  discoveryConfig?: DiscoveryDocument;
  authConfig?: AuthRequestConfig;
};

type UseSocialAuthReturn = {
  signIn: (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>;
  request: AuthRequest | null;
  response: AuthSessionResult | null;
};

WebBrowser.maybeCompleteAuthSession();

export const useSocialAuth = ({
  authorizationEndpoint,
  clientId,
  scopes,
  redirectUri,
  discoveryConfig,
  authConfig,
}: UseSocialAuthParams): UseSocialAuthReturn => {
  const discovery = useAutoDiscovery({
    authorizationEndpoint,
    ...discoveryConfig,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      redirectUri: makeRedirectUri(redirectUri),
      scopes,
      ...authConfig,
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      SecureStore.setItem('session.accessToken', code);
    }
  }, [response]);

  return { signIn: promptAsync, request, response };
};
