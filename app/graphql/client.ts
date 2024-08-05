
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//   }),
//   cache: new InMemoryCache(),
// });
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import { ApolloClient } from '@apollo/client/core/index.js';
import { InMemoryCache } from '@apollo/client/cache/index.js';
import { HttpLink } from '@apollo/client/link/http/index.js';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.PAYLOAD_URI
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default client;
