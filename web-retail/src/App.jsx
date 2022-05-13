import React from "react";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import { ContextProvider } from "./components/context/Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ContextProvider>
          <div className={classes.App}>
            <Header />
            <Body />
          </div>
        </ContextProvider>
      </ApolloProvider>
    );
  }
}

export default App;
