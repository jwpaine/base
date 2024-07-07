import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-graphql-endpoint.com/graphql', 
  }),
  cache: new InMemoryCache(),
});

export default client;
