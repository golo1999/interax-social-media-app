import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Router } from "./router";

import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
