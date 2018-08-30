import React, { Component } from 'react';
import Pagnation from 'Pagination'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Front end test MU</h1>
        </header>
        <Pagnation listId=""/>
      </div>
    );
  }
}

export default App;
