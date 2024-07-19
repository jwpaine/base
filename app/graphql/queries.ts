import pkg from '@apollo/client';
const { gql } = pkg;

export const GET_THEME_META = gql`
  query GetTheme($domain: String!) {
    Sites(where: { domainName: { equals: $domain } }) {
      docs {
        meta {
          vid
          siteName
          title
        }
        theme {
          colors {
            primary
            secondary
          }
        }
      }
    }
  }
`;