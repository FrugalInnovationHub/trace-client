import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Product from './product/Product.js';
import LoginForm from '../LoginForm';
import ShowProduct from './product/ShowProduct.js';
import { Container } from 'semantic-ui-react';
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Route exact path="/" render={() => ( <LoginForm />)} />
          <Route exact path="/product" render={() => ( <Product />)} />
          <Route exact path="/product/show" render={() => ( <ShowProduct /> )}/>
        </Container>
      </div>
    );
  }
}

// <LoginForm />
export default App;

