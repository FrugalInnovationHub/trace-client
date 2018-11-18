import React, { Component } from 'react';
import Product from './Product.js';
import { Container, Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' textAlign = 'center' color='teal'>MedShare</Header>
        <Product />
      </Container>
    );
  }
}

export default App;
