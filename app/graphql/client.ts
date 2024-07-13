import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, HttpLink } = pkg;

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//   }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(), // This can remain for schema awareness, but won't be used with no-cache policy
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