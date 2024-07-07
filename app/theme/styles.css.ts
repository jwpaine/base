import { createThemeContract, createTheme, globalStyle } from '@vanilla-extract/css';

export const breakpoints = {
  small: "screen and (min-width: 400px)",
  medium: "screen and (min-width: 800px)",
  large: "screen and (min-width: 1024px)",
} as const;

export const vars = createThemeContract({
  color: {
    brand: null,
  },
});

const themeConfig = {
  foo: {
    color: {
      brand: 'green',
    },
  },
  default: {
    color: {
      brand: 'blue',
    },
  },
};

type ThemeKeys = keyof typeof themeConfig;

export const themes = Object.keys(themeConfig).reduce((acc, key) => {
  const themeKey = key as ThemeKeys;
  acc[themeKey] = createTheme(vars, themeConfig[themeKey]);
  return acc;
}, {} as Record<ThemeKeys, string>);


// Remove margin and padding from body and use theme variable for background
globalStyle('body', {
  margin: '0',
  padding: '0',
  background: vars.color.brand,
});
