import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import SerializeForm from 'form-serialize';
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import AuthService from '../../utils/AuthService.js';

const auth = new AuthService();

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signupError: '',
      emailValid: false,
      formValid: false,
      redirectToReferrer: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput=this.handleUserInput.bind(this);
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailValid = re.test(value);
        emailValid ? this.setState({signupError: ''}) : this.setState({signupError: 'Email is invalid'});
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid
    });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit(e) {
    e.preventDefault();
    const {email, password} = SerializeForm(e.target, { hash: true });
    this.setState({email, password});
    //Login user
    if (this.state.emailValid){
      auth.signup(email, password)
      .then(result => {
        if (!result.token) {
          this.setState({signupError: result.message})
          return;
        }

        auth.finishAuthentication(result.token);
        this.setState(() => ({
          redirectToReferrer: true
        }));

      });
    }
  }

  render() {
    const { signupError, redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to='/product' />;
    }
    return(
      <div className='login-form' style={{ paddingTop: '15%' }}>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign-Up
            </Header>

            {
                this.state.signupError && ( <div >{signupError}</div>)
            }

            <Form size='large' onSubmit={this.handleSubmit} id="signup-form">
              <Segment>
                <Form.Input 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail address' 
                  name='email'
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  />
                <Form.Input
                  fluid icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                />

                <Button color='teal' fluid size='large'>
                  SignUp
                </Button>
              </Segment>
              <Segment>
                <Button color='teal' fluid size='large' as={ Link } to='/'>
                  Already a user?
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}


export default Signup;