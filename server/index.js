const { ApolloServer } = require("apollo-server");

const { resolvers } = require("./schema/resolvers");
const { typeDefs } = require("./schema/type-defs");

const server = new ApolloServer({ resolvers, typeDefs });

// console.log(new Date().toLocaleDateString("en-GB"));

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
