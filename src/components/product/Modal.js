import React, { Component } from 'react';
import { Form, Button, Segment, Modal, Dropdown} from 'semantic-ui-react';
import SerializeForm from 'form-serialize';
import dropdownOptions from './dropDownOptions.js';
import AuthService from '../../utils/AuthService.js';
import API_URL from '../../utils/constants.js';
const auth = new AuthService();

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown : ''
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDropdown(e, { value }) {
    this.setState({dropDown: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const values = SerializeForm(e.target, { hash: true });
    const { productNumber, productValue, manufacturerName, manufacturerId } = values;
    const payload = {
      id: this.props.element.id,
      productNumber,
      value : productValue,
      manufacturerName,
      manufacturerId
    };

    auth.fetch(`${API_URL}/product/`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
    .then((result) => {
      if (result.error) {
        console.log('Error Occured',result.error);
        return;
      }
      console.log('Data Updated');
    });
  }

  componentDidMount() {
    this.setState({
      dropDown: this.props.element.product_id
    });
  }

  render() {
    let {element} = this.props;
    return(
        <Modal.Content>
          <Segment secondary style={{ marginTop: '2em' }}>
          <Form onSubmit={this.handleSubmit} id="product-form">
            <Form.Field required>
              <label htmlFor="productName">
                Product Name
              </label>
              <Dropdown
              onChange={this.handleDropdown}
              options={dropdownOptions}
              selection
              search
              defaultValue={element.product_id}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field required>
                <label htmlFor="productNumber">
                  Product Number
                </label>
                <input type="text" name="productNumber" value={this.state.dropDown}  readOnly required/>
              </Form.Field>
              <Form.Field required>
                <label htmlFor="productValue">
                  Product Value
                </label>
                <input type="text" name="productValue" defaultValue={element.value} required/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field required>
                <label htmlFor="manufacturerName">
                  Manufacturer Name
                </label>
                <input type='text' name='manufacturerName' defaultValue={element.manufacturer_name} required/>
              </Form.Field>
              <Form.Field required>
                <label htmlFor="manufacturerId">
                  Manufacturer Number
                </label>
                <input type='text' name='manufacturerId' defaultValue={element.manufacturer_id} required/>
              </Form.Field>
            </Form.Group>
            <Button> Save Details </Button>
          </Form>
          </Segment>
        </Modal.Content>
    )
  }
}

export default UpdateModal;