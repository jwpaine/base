import pkg from '@apollo/client';
const { gql } = pkg;

export const GET_THEME_META= gql`
  query GetTheme($domain: String!) {
    metadata(domain: $domain) {
      vid
      siteName
      title
    }
    theme(domain: $domain) {
      colors {
        primary
        secondary
      }
    }

  }
`;