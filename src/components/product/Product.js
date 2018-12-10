import React, { Component } from 'react';
import SerializeForm from 'form-serialize';
import Manufacturer from './Manufacturer.js';
import Api from '../../utils/MedshareAPI.js';
import {  Form, Button, Segment, Header, Icon, Modal } from 'semantic-ui-react';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers : [{}],
      successMessage : false,
      message : '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiSuccess = this.handleApiSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

    Api.post(payload)
    .then((response) => {
      this.handleApiSuccess();
    })
    .catch((error) => {
      console.log('Error Occured, Try correct values');
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(function(state) {
      return {
        manufacturers : state.manufacturers.concat([{}])
      };
    });
  }

  handleApiSuccess() {
    this.setState({
      successMessage: true,
      message: 'Product added successfully'
    });
    document.getElementById("product-form").reset();
  }

  handleClose() {
    this.setState({
      successMessage: false
    });
  }

  render() {
    return (
      <div>
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
            <Form.Field>
              <label htmlFor="category">
                Category
              </label>
              <select name="category">
                <option value="supply">Supply</option>
                <option value="biomed">BioMed</option>
                <option value="dme">DME</option>
              </select>
            </Form.Field>
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
      {this.state.successMessage && (
        <Modal
          open={this.state.successMessage}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Header as='h1'>Message</Header>
          <Modal.Content>
            <h3>{this.state.message}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      </div>
    );
  }
}

export default Product;