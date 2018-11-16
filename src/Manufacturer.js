import React, { Component } from 'react';

class Manufacturer extends Component {
  render() {
    return(
      <div>
        <div>
          <label htmlFor="manufacturerName">
            Manufacturer Name
          </label>
          <input type='text' name='manufacturerName' placeholder='Enter Manufacturer Name' required/>
        </div>
        <div>
          <label htmlFor="manufacturerId">
            Manufacturer Number
          </label>
          <input type='text' name='manufacturerId' placeholder='Enter Manufacturer Number' required/>
        </div>
      </div>
    );
  }
}

export default Manufacturer;
