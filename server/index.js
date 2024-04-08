const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const http = require("http");

const { resolvers } = require("./schema/resolvers");
const { typeDefs } = require("./schema/type-defs");

// https://www.apollographql.com/docs/apollo-server/v3/integrations/middleware/
async function startApolloServer(resolvers, typeDefs) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    cache: "bounded",
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    resolvers,
    typeDefs,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/" });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(resolvers, typeDefs);
