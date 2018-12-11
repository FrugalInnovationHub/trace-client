import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Product from './product/Product.js';
// import LoginForm from './LoginForm';
import ShowProduct from './product/ShowProduct.js';
import { Container } from 'semantic-ui-react';
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <div>
      <Container style={{ marginTop: '3em' }}>
        <Route exact path="/" render={() => ( <Product />)} />
        <Route exact path="/product" render={() => ( <ShowProduct /> )}/>
      </Container>
      </div>
    );
  }
}

// <LoginForm />
export default App;

