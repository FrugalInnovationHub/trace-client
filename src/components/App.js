import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  withRouter,
  HashRouter
} from "react-router-dom";
import Product from './product/Product.js';
import Login from './login/Login';
import Signup from './login/Signup';
import ShowProduct from './product/ShowProduct';
import { Container } from 'semantic-ui-react';
import AuthService from '../utils/AuthService.js';
import { Button, Menu } from 'semantic-ui-react';
import '../css/app.css';

const auth = new AuthService();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

const AuthButton = withRouter(
  ({ history }) =>
    auth.isAuthenticated() ? (
        <Menu.Item>
          <Button color='teal' size='tiny' onClick={() => {
            auth.logout();
            history.push('/');
          }}>
            Sign out
          </Button>
        </Menu.Item>
    ) : (
      <Menu.Item>
        <Button color='teal' size='tiny' onClick={() => {
          history.push('/');
        }}>
          Login
        </Button>
      </Menu.Item>
    )
);

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <HashRouter>
            <div>
              <Menu fixed='top' inverted color='teal' size='large'>
                <Container>
                  <Menu.Item header as={ Link } to='/product'>
                    Medshare
                  </Menu.Item>
                  <Menu.Item header as={ Link } to='/product'>
                    Product Page
                  </Menu.Item>
                  <Menu.Item header as={ Link } to='/product/show'>
                    Product Database
                  </Menu.Item>
                  <Menu.Menu position='right'>
                    <AuthButton />
                  </Menu.Menu>
                </Container>
              </Menu>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path='/product' component={Product} />
              <PrivateRoute exact path="/product/show" component={ShowProduct} />
            </div>
          </HashRouter>
        </Container>
      </div>
    );
  }
}

// <LoginForm />
export default App;

