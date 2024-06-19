import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useCallback, useEffect } from "react";

import { Router } from "router";
import { useSettingsStore } from "store";

import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

function App() {
  const { setScrollPosition } = useSettingsStore();

  const handleScroll = useCallback(
    () => setScrollPosition(window.scrollY),
    [setScrollPosition]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
