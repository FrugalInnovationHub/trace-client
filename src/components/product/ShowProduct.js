import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Segment, Table, Button, Icon } from 'semantic-ui-react';
import AuthService from '../../utils/AuthService.js';
import API_URL from '../../utils/constants.js';
import { CSVLink } from "react-csv";

const headers = [
  { label: "Product Name", key: "product_name" },
  { label: "Product Number", key: "product_id" },
  { label: "Value", key: "value" },
  { label: "Manufacturer Name", key: "manufacturer_name" },
  { label: "Manufacturer Number", key: "manufacturer_id" }
];


const auth = new AuthService();

class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    // Use parentCode to create a dropdown list later on
    auth.fetch(`${API_URL}/product/`)
    .then((data) => {
      this.setState({products : data});
    });
  }

  render() {
    let products = this.state.products;
    return(
      <div style={{ paddingTop: '5em' }}>
        <Segment.Inline clearing style={{ paddingBottom: '3em' }}>
          <Button animated bordered color='teal' as={ Link } to='/product' floated='right'>
            <Button.Content visible>Previous</Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow' />
            </Button.Content>
          </Button>
          <CSVLink
            data={products}
            headers={headers}
            className="ui basic teal button right floated">
            Download
          </CSVLink>
        </Segment.Inline>
        <Segment style={{ marginTop: '3em', marginBottom: '3em' }}>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Product Number</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Manufacturer Name</Table.HeaderCell>
                <Table.HeaderCell>Manufacturer Number</Table.HeaderCell>
                <Table.HeaderCell>
                  <Button.Group size='mini'>
                    <Button basic color='teal'>
                      Edit
                    </Button>
                    <Button.Or />
                    <Button basic color='red'>
                      Delete
                    </Button>
                  </Button.Group>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.state.products.length > 0 ? (products.map(function(ele,index){
                  return (
                    <Table.Row key={ele.id}>
                      <Table.Cell>{ele.product_name}</Table.Cell>
                      <Table.Cell>{ele.product_id}</Table.Cell>
                      <Table.Cell>{ele.value}</Table.Cell>
                      <Table.Cell>{ele.manufacturer_name}</Table.Cell>
                      <Table.Cell>{ele.manufacturer_id}</Table.Cell>
                      <Table.Cell>
                        <Button.Group size='mini'>
                          <Button basic color='teal'>
                              <Icon name='edit' />
                          </Button>
                          <Button.Or />
                          <Button basic color='red'>
                            <Icon name='delete' />
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
                ) : (
                <p>No entries yet.</p>)
              }
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}

export default ShowProduct;