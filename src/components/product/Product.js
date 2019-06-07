import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SerializeForm from 'form-serialize';
import {Form, Button, Segment, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import Manufacturer from './Manufacturer.js';
import AuthService from '../../utils/AuthService.js';
import API_URL from '../../utils/constants.js';
import dropdownOptions from './dropDownOptions';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import FileBase64 from 'react-file-base64';
const fs = require('fs');


const auth = new AuthService();

const style = {
  captureImage: {
    width: '100%',
  }
};
 

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers : [{}],
      successMessage : false,
      message : '',
      dropDown : '',
      parentCode : [],
      takePhoto: false,
      files: [],
      imgb64: null,
    };

    // Use parentCode to create a dropdown list later on
    auth.fetch(`${API_URL}/product/parent/`)
    .then((data) =>{
      const parentCode = data.map(function(data) {
        return {
          text: data.product_name,
          value: data.product_id
        };
      });
      this.setState({parentCode: parentCode});
    });

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiSuccess = this.handleApiSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTakePhotoClick = this.onTakePhotoClick.bind(this);
  }

  handleDropdown(e, { value }) {
    this.setState({dropDown: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const values = SerializeForm(e.target, { hash: true });
    // const { productName, productNumber, category, manufacturerName, manufacturerId } = values;
    const { productNumber, category, manufacturerName, manufacturerId } = values;
    const manufacturer = [];
    const imageData = this.state.imgb64;
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
      productNumber,
      category,
      manufacturer,
      imageData
    };

    auth.fetch(`${API_URL}/product/`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(result => {
      if (result.error) {
        console.log('Error Occured',result.error);
        return
      }
      this.handleApiSuccess();
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
      message: 'Product added successfully',
      dropDown : '',
      imgb64: null,
      takePhoto: false,
    });
    // Rerender dom
    document.getElementById("product-form").reset();
  }

  handleClose() {
    this.setState({
      successMessage: false
    });
  }


  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    this.setState({imgb64: dataUri})
  }

  getFiles(files){
    this.setState({ imgb64: files.base64 })
  }

  onTakePhotoClick() {
    this.setState({takePhoto: true})
  }

  render() {
    // const {selcted} = this.state;
    // console.log('state', this.state);
    return (
      <div style={{ paddingTop: '5em' }}>
        <Button animated color='teal' as={ Link } to='/product/show' floated='right'>
          <Button.Content visible>Show Products</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
        <Segment secondary style={{ marginTop: '3.5em' }}>
          <Form onSubmit={this.handleSubmit} id="product-form">
            <Form.Field required>
              <label htmlFor="productName">
                Product Name
              </label>

              <Dropdown
                onChange={this.handleDropdown}
                options={dropdownOptions}
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
                <input type="text" name="productNumber" placeholder="Enter Product Number" value={this.state.dropDown} readOnly required/>
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
            <Segment>
              <Form.Field>
                  <label htmlFor="productImage">
                    Upload Product Image
                  </label>
                  {/*<input id= 'app' type='text' name='productImage' required/>*/}
                  {/*<input type='Button' value='Upload Product Image' name='productImage' required/>*/}
                  <button type="button" onClick={this.onTakePhotoClick}>Take a photo</button>
                  <span> OR</span>
                  <FileBase64
                      multiple={ false }
                      onDone={ this.getFiles.bind(this) } 
                  />
                  {this.state.takePhoto ? <Camera
                                            onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                          /> : <div></div>}
                  <img
                    style={style.captureImage}
                    src={this.state.imgb64}
                  />
                </Form.Field>
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