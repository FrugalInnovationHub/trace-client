import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Segment, Table, Button, Icon, Modal } from 'semantic-ui-react';
import AuthService from '../../utils/AuthService.js';
import API_URL from '../../utils/constants.js';
import { CSVLink } from "react-csv";
import UpdateModal from "./Modal";

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
      products: [],
      openModal: false,
      element : []
    };
    // Use parentCode to create a dropdown list later on
    auth.fetch(`${API_URL}/product/`)
    .then((data) => {
      this.setState({products : data});
    });
    this.modalClose = this.modalClose.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
  }

  handleDelete(e,ele) {
    e.preventDefault();
    auth.fetch(`${API_URL}/product?id=${ele.id}`, {
      method: 'DELETE'
    })
    .then(result => {
      if (result.error) {
        console.log('Error Occured',result.error);
        return;
      }
      this.handleDeleteSuccess();
    });
  }

  handleDeleteSuccess() {
    auth.fetch(`${API_URL}/product/`)
    .then((data) => {
      this.setState({products : data});
    });
  }

  handleModal(e, ele) {
    e.preventDefault();
    this.setState({
      openModal: true,
      element : ele
    });
  }

  modalClose() {
    setTimeout(() => {
      auth.fetch(`${API_URL}/product/`)
        .then((data) => {
          this.setState({
            products : data ,
            openModal: false
          });
        });
    }, 100);
  }

  render() {
    let products = this.state.products;
    let current = this;
    return(
      <div style={{ paddingTop: '5em' }}>
        <Button animated color='teal' as={ Link } to='/product' floated='right'>
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
        <Segment style={{ marginTop: '3.5em', marginBottom: '3em' }}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Product Number</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Value</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Manufacturer Name</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Manufacturer Number</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
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
                      <Table.Cell textAlign='center'>{ele.product_id}</Table.Cell>
                      <Table.Cell textAlign='center'>{ele.value}</Table.Cell>
                      <Table.Cell textAlign='center'>{ele.manufacturer_name}</Table.Cell>
                      <Table.Cell textAlign='center'>{ele.manufacturer_id}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button.Group size='mini'>
                          <Button basic color='teal' onClick={(e) => current.handleModal(e, ele)}>
                              <Icon name='edit' />
                          </Button>
                          <Button.Or />
                          <Button basic color='red'  onClick={(e) => current.handleDelete(e, ele)}>
                            <Icon name='delete' />
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
                ) : (
                <Table.Row>
                  <Table.Cell>No Entries yet.</Table.Cell>
                </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </Segment>
        {this.state.openModal && (
          <Modal
            open={this.state.openModal}
            onClose={this.modalClose}
          >
            <UpdateModal element={current.state.element} handleModal={this.modalClose}/>
          </Modal>
        )}
      </div>
    )
  }
}

export default ShowProduct;