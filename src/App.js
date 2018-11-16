import React, { Component } from 'react';
import Product from './Product.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Hello Medshare!
        </p>
        <Product />
      </div>
    );
  }
}

export default App;
