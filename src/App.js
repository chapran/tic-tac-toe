import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameContainer from './components/GameContainer'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <GameContainer />
  </div>
);

export default App;
