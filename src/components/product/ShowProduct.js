import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Segment, Table, Header, Button, Icon } from 'semantic-ui-react';
const axios = require('axios');
const style = {
  fontWeight: 300,
  letterSpacing: 1.5,
}


class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProduct = this.getProduct.bind(this);
  }

  getProduct() {
    const scope = this;
    axios.get('http://localhost:3001/api/product/')
    .then(function(response) {
      scope.setState({products : response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getProduct();
  }
  render() {
    let products = this.state.products;
    return(
      <div>
        <Header as='h1' textAlign = 'center' color='teal' style={style}>Product List</Header>
        <Segment.Inline clearing style={{ paddingBottom: '3em' }}>
          <Button animated bordered color='teal' as={ Link } to='/' floated='right'>
            <Button.Content visible>Previous</Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow' />
            </Button.Content>
          </Button>
        </Segment.Inline>
        <Segment style={{ marginTop: '3em', marginBottom: '3em' }}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Product Number</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Manufacturer Name</Table.HeaderCell>
                <Table.HeaderCell>Manufacturer Number</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                products.map(function(ele,index){
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{ele.product_name}</Table.Cell>
                      <Table.Cell>{ele.product_id}</Table.Cell>
                      <Table.Cell>{ele.category}</Table.Cell>
                      <Table.Cell>{ele.manufacturer_id}</Table.Cell>
                      <Table.Cell>{ele.manufacturer_name}</Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}

export default ShowProduct;