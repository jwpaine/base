import { createTheme } from '@vanilla-extract/css';
import { vars } from './styles.css';
// import client from '~/graphql/client';
// import { GET_THEME } from '~/graphql/queries';

export const fetchTheme = async (domain: string) => {
  // Fake response for testing purposes
  const fakeResponse = {
    theme: {
      color: {
        brand: 'green'
      },
    },
  };

  const themeData = fakeResponse.theme;

  return createTheme(vars, themeData);
};
