import React from 'react';

// styles
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import PokemonList from './pages/pokemon-list';
import PokemonDetail from './pages/pokemon-detail';

// 3rd lib
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/',
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/pokemon" component={PokemonList} />
          <Route path="/pokemon/:id" component={PokemonDetail} />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
