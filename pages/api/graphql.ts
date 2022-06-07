import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import Cors from 'micro-cors';

const cors = Cors();

export const config = {
    api: {
        bodyParser: false,
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
});
