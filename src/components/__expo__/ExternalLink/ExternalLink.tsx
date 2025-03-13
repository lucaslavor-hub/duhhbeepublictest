import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { ReactNode, type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  callbackFn?: () => void;
  href: string;
  children: ReactNode;
};

export function ExternalLink({ callbackFn, href, children, ...rest }: Props) {
  return (
    <Link
      asChild
      target="_blank"
      href={href as Href<string>}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();

          callbackFn && callbackFn();
          await openBrowserAsync(href);
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
