import { createThemeContract, globalStyle, createTheme } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null,
  },
});

type ThemeData = {
  [key: string]: {
    color: {
      brand: string;
    };
  };
};

const themeData: ThemeData = {
  'localhost' : {
    color: {
      brand: 'red',
    },
  },
  'base' : {
    color: {
      brand: 'blue',
    },
  },
};

type Themes = {
  [key: string]: string;
};

const themes: Themes = {};

for (const domain in themeData) {
  if (themeData.hasOwnProperty(domain)) {
    themes[domain] = createTheme(vars, themeData[domain]);
  }
}

export const defaultTheme = themes['base'];

globalStyle('body', {
  margin: '0',
  padding: '0',
  background: vars.color.brand,
});

export { themes };
