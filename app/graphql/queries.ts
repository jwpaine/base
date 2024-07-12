import pkg from '@apollo/client';
const { gql } = pkg;

export const GET_THEME= gql`
  query GetTheme($domain: String!) {
    theme(domain: $domain) {
      colors {
        primary
        secondary
      }
    }
  }
`;