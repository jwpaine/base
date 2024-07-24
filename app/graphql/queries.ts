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

export const GET_HOME_CONTENT = gql`
  query GetHomeContent($domain: String!) {
    Sites(where: { domainName: { equals: $domain } }) {
      docs {
        domainName
        pages {
          home {
            __typename
            ... on Container {
              background
              minHeight
              minWidth
              maxWidth
              margin
              padding
              elements {
                __typename
                ... on Button {
                  text
                  link
                  buttonType
                }
                __typename
                ... on H1 {
                  text
                  color
                  fontSize
                }
                __typename
                ... on P {
                  text
                  color
                  fontSize
                }
              }
            }
          }
        }
      }
    }
  }
`