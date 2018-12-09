import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GridContainer from './components/GridContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <GridContainer />
      </div>
    );
  }
}

export default App;
