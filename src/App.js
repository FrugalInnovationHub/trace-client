import React, { Component } from 'react';
import Product from './Product.js';
import { Container, Header } from 'semantic-ui-react';
import './app.css';

const style = {
  fontWeight: 300,
  letterSpacing: 1.5,
}


class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1' textAlign = 'center' color='teal' style={style}>MedShare</Header>
        <Product />
      </Container>
    );
  }
}

export default App;
