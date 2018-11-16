import React, { Component } from 'react';
import SerializeForm from 'form-serialize';
import Manufacturer from './Manufacturer.js';

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="productName">
              Product Name
            </label>
            <input type='text' name='productName' placeholder='Enter Product Name' required/>
          </div>
          <div>
            <label htmlFor="productNumber">
              Product Number
            </label>
            <input type='text' name='productNumber' placeholder='Enter Product Number' required/>
          </div>
          <div>
            <label htmlFor="category">
              Category
            </label>
            <input type='text' name='category' placeholder='Enter Category' required/>
          </div>
          {
            this.state.manufacturers.map(function(manufacturer, index) {
              return <Manufacturer key={index}/>
            })
          }
          <div>
            <button onClick={this.handleClick}>Add Manufacturer</button>
          </div>
          <div>
            <button>Add Product Details</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Product;