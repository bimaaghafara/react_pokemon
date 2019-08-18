import React from 'react';
import './App.scss';

// pages
import PokemonList from './pages/pokemon-list';
import PokemonDetail from './pages/pokemon-detail';

// 3rd lib
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/pokemon" component={PokemonList} />
          <Route path="/pokemon/:id" component={PokemonDetail} />
      </Router>
    </div>
  );
}

export default App;
