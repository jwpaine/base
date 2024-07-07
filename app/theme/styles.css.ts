import { createThemeContract, globalStyle } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null,
  },
});

// Remove margin and padding from body and use the theme variable for background
globalStyle('body', {
  margin: '0',
  padding: '0',
  background: vars.color.brand,
});
