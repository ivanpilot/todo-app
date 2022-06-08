import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    // uri: process.env.GRAPHQL_API,
    cache: new InMemoryCache(),
});

export default apolloClient;
