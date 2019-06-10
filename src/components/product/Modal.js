import React, { Component } from 'react';
import { Form, Button, Segment, Modal, Dropdown} from 'semantic-ui-react';
import SerializeForm from 'form-serialize';
import dropdownOptions from './dropDownOptions.js';
import AuthService from '../../utils/AuthService.js';
import API_URL from '../../utils/constants.js';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import FileBase64 from 'react-file-base64';
const auth = new AuthService();

const style = {
  captureImage: {
    width: '100%',
  }
};

function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown : '',
      takePhoto: false,
      files: [],
      imgb64: null,
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTakePhotoClick = this.onTakePhotoClick.bind(this);
  }

  handleDropdown(e, { value }) {
    this.setState({dropDown: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('values: ',e.target);
    const values = SerializeForm(e.target, { hash: true });
    console.log('values: ',values);
    const imageData = this.state.imgb64;
  
    const { productNumber, productValue, manufacturerName, manufacturerId } = values;
    const payload = {
      id: this.props.element.id,
      productNumber,
      value : productValue,
      manufacturerName,
      manufacturerId,
      imageData
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
    });
    this.props.handleModal();
  }

  componentDidMount() {
    this.setState({
      dropDown: this.props.element.product_id
    });

    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
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
            <Form.Group widths="equal">
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
                                          idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                          isImageMirror = {false}
                                          imageCompression = {0.5}
                                        /> : <div></div>}
                <img
                  style={style.captureImage}
                  src={this.state.imgb64}
                />
              </Form.Field>
              <Form.Field >
               {/* <label htmlFor="manufacturerImage">
                  Upload Manufacturer Image
                </label>*/}
                {/*<input id ='app' type='text' name='manufacturerImage' required/>*/}
                {/*<input type='Button' value='Upload Manufacturer Image' name='productImage' required/>*/}
                {/*<input type ='file' onClick={this.handleFileSelect}/>*/}
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