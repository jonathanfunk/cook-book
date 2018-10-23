import React, { Component } from 'react';
import './styles/App.scss';
import Navigation from './Container/Navigation';
import Landing from './Container/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Landing />
      </div>
    );
  }
}

export default App;
