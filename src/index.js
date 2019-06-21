import '@babel/polyfill';
import { ApolloServer } from 'apollo-server';

import connectDatabase from './utils/mongoose';
import config from './utils/config';
import { typeDefs, resolvers } from './utils/graphql';
import { isAuthenticated } from './utils/auth';

connectDatabase(config.get('mongodb'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await isAuthenticated(req),
  }),
});

server.listen({ port: config.get('port') }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});