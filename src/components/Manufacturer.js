import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Manufacturer extends Component {
  render() {
    return(
      <Form.Group widths="equal">
        <Form.Field required>
          <label htmlFor="manufacturerName">
            Manufacturer Name
          </label>
          <input type='text' name='manufacturerName' placeholder='Enter Manufacturer Name' required/>
        </Form.Field>
        <Form.Field required>
          <label htmlFor="manufacturerId">
            Manufacturer Number
          </label>
          <input type='text' name='manufacturerId' placeholder='Enter Manufacturer Number' required/>
        </Form.Field>
      </Form.Group>
    );
  }
}

export default Manufacturer;
