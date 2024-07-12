import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, HttpLink } = pkg;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;