import React, { Component } from 'react';
import SerializeForm from 'form-serialize';
import Manufacturer from './Manufacturer.js';
import {  Form, Button, Segment } from 'semantic-ui-react';


const options = [
  { key: 's', text: 'Supply', value: 'supply' },
  { key: 'b', text: 'BioMed', value: 'biomed' },
  { key: 'd', text: 'DME', value: 'dme' },
];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers : [{}]
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const values = SerializeForm(e.target, { hash: true });
    const { productName, productNumber, category, manufacturerName, manufacturerId } = values;
    const manufacturer = [];
    if (Array.isArray(manufacturerName) && Array.isArray(manufacturerId)) {
      manufacturerName.forEach((name, index) => {
        manufacturer.push({
          manufacturerId :  manufacturerId[index],
          manufacturerName: name
        });
      });
    } else {
      manufacturer.push({
        manufacturerId,
        manufacturerName
      });
    }

    // Create payload
    const payload = {
      productName,
      productNumber,
      category,
      manufacturer
    };

    document.getElementById("product-form").reset();

    console.log(payload);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(function(state) {
      return {
        manufacturers : state.manufacturers.concat([{}])
      };
    });
  }

  render() {
    return (
      <Segment secondary style={{ marginTop: '2em' }}>
        <Form onSubmit={this.handleSubmit} id="product-form">
          <Form.Field required>
            <label htmlFor="productName">
              Product Name
            </label>
            <input type="text" name="productName" placeholder="Enter Product Name" required/>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field required>
              <label htmlFor="productNumber">
                Product Number
              </label>
              <input type="text" name="productNumber" placeholder="Enter Product Number" required/>
            </Form.Field>
            <Form.Select fluid label='Category' options={options} name="category" placeholder='Category' searchInput={{ id: 'category' }} required/>
          </Form.Group>
          <Segment>
            {
              this.state.manufacturers.map(function(manufacturer, index) {
                return (
                    <Manufacturer key={index}/>
                  );
              })
            }
            <Button onClick={this.handleClick}>Add Manufacturer</Button>
          </Segment>
          <Button color="teal">Add Product Details</Button>
        </Form>
      </Segment>
    );
  }
}

export default Product;