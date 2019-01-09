import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SerializeForm from 'form-serialize';
import {Form, Button, Segment, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import Manufacturer from './Manufacturer.js';
import Api from '../../utils/MedshareAPI.js';


// const countryOptions = [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }];
const skillsOptions = [
  { key: 'Beds, Electric, Used, w/o Mattress', text: 'Beds, Electric, Used, w/o Mattress', value: 'Beds, Electric, Used, w/o Mattress' },
  { key: 'Syringes, 10cc, Luer LockI', text: 'Syringes, 10cc, Luer LockI', value: 'Syringes, 10cc, Luer LockI' },
  { key: 'Beds, Electric, Homecare, w/Mat', text: 'Beds, Electric, Homecare, w/Mat', value: 'Beds, Electric, Homecare, w/Mat' },
  { key: 'Stretchers, Hydraulic with Mat.', text: 'Stretchers, Hydraulic with Mat.', value: 'Stretchers, Hydraulic with Mat.' },
  { key: 'STERILIZATION PACKAGING, SELF SEAL POUCH,12x15 1/2', text: 'STERILIZATION PACKAGING, SELF SEAL POUCH,12x15 1/2', value: 'STERILIZATION PACKAGING, SELF SEAL POUCH,12x15 1/2' },
  { key: 'Gauze Dressings, Tracheostomy Drain, 4in x 4in', text: 'Gauze Dressings, Tracheostomy Drain, 4in x 4in', value: 'Gauze Dressings, Tracheostomy Drain, 4in x 4in' },
  { key: 'Syringes, 35cc, Eccentric Luer tip', text: 'Syringes, 35cc, Eccentric Luer tip', value: 'Syringes, 35cc, Eccentric Luer tip' },
  { key: 'Syringes, 10cc, TwinPak', text: 'Syringes, 10cc, TwinPak', value: 'Syringes, 10cc, TwinPak' },
  { key: 'Syringes, Insulin, 1cc without needle', text: 'Syringes, Insulin, 1cc without needle', value: 'Syringes, Insulin, 1cc without needle' },
  { key: 'Syringes, Insulin, 3/10cc, 29G x 1', text: 'Syringes, Insulin, 3/10cc, 29G x 1', value: 'Syringes, Insulin, 3/10cc, 29G x 1' },
  { key: 'Towels, Surgical, Cloth', text: 'Towels, Surgical, Cloth', value: 'Towels, Surgical, Cloth' },
  { key: 'Gauze Dressings, Non-Adherent, 3in x 8in', text: 'Gauze Dressings, Non-Adherent, 3in x 8in', value: 'Gauze Dressings, Non-Adherent, 3in x 8in' },
];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers : [{}],
      successMessage : false,
      message : '',
      dropDown : '',
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiSuccess = this.handleApiSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDropdown(e, { value }) {
    this.setState({dropDown: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const values = SerializeForm(e.target, { hash: true });
    // const { productName, productNumber, category, manufacturerName, manufacturerId } = values;
    const { productNumber, category, manufacturerName, manufacturerId } = values;
    const productName = this.state.dropDown;
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
    document.getElementById("product-form").reset();
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
    // Rerender dom
    document.getElementById("product-form").reset();
  }

  handleClose() {
    this.setState({
      successMessage: false
    });
  }

  render() {
    // const {selcted} = this.state;
    return (
      <div style={{ paddingTop: '5em' }}>
          <Segment.Inline clearing style={{ paddingBottom: '1.5em' }}>
            <Button animated bordered color='teal' as={ Link } to='/product/show' floated='right'>
              <Button.Content visible>Show Products</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Segment.Inline>
        <Segment secondary style={{ marginTop: '2em' }}>
          <Form onSubmit={this.handleSubmit} id="product-form">
            <Form.Field required>
              <label htmlFor="productName">
                Product Name
              </label>

              <Dropdown
                onChange={this.handleDropdown}
                options={skillsOptions}
                placeholder='Choose an option'
                selection
                search
                value={this.state.dropDown}
              />
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