import { createFont, createTamagui, createTokens } from 'tamagui';
import { config } from '@tamagui/config/v3';

const customFont = createFont({
  family: 'Cabin, Hindi, sans-serif',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 22,
    4: 24,
  },
  weight: {
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
  },
  letterSpacing: {
    1: 0,
    2: -1,
  },
  face: {
    700: { normal: 'CabinBold, HindiBold' },
    800: { normal: 'CabinBold, HindiBold' },
    900: { normal: 'CabinBold, HindiBold' },
  },
});

const size = {
  0: 0,
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  5: 25,
  6: 30,
  true: 10,
};

export const tokens = createTokens({
  size,
  space: { ...size, '-1': -5, '-2': -10 },
  radius: { 0: 0, 1: 3 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    primary: '#FBBF00',
    brandGold: '#BB6B14',
    brandGoldOpacity: '#FBBF0029',
    brandGray: '#EFEFEF',
    brandWhite: '#F8F8F8',
    brandGreen: '#65E777',
    brandBrown: '#352800',
    brandRed: '#DC3412',
    brandRedDanger: '#EA3549',
    placeholder: 'rgba(0, 0, 0, 0.5)',
  },
});

export const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    heading: customFont,
    body: customFont,
  },
  tokens,
  themes: {
    dark: {
      primary: tokens.color.primary,
      brandGold: tokens.color.brandGold,
      brandGray: tokens.color.brandGray,
      brandWhite: tokens.color.brandWhite,
      brandBrown: tokens.color.brandBrown,
      brandRed: tokens.color.brandRed,
    },
    light: {
      primary: tokens.color.primary,
      brandGold: tokens.color.brandGold,
      brandGray: tokens.color.brandGray,
      brandWhite: tokens.color.brandWhite,
      brandBrown: tokens.color.brandBrown,
      brandRed: tokens.color.brandRed,
    },
  },
  shorthands: {
    p: 'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    my: 'marginVertical',
    mx: 'marginHorizontal',
    f: 'flex',
    m: 'margin',
    w: 'width',
    h: 'height',
    bg: 'backgroundColor',
    flexDir: 'flexDirection',
    text: 'fontSize',
  } as const,
  defaultProps: {
    backgroundColor: '#F8F8F8',
  },
});

type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
