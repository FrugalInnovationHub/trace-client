import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';

import API_URL  from './constants';

export default class AuthService extends EventEmitter {
  constructor() {
    super();

    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(endpoint, values) {
    return this.fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(email, password) {
    return this._doAuthentication('login', { email, password });
  }

  signup(email, password) {
    return this._doAuthentication('signup', { email, password });
  }

  isAuthenticated() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem('token');
    if (token) {
      return !isTokenExpired(token);
    } else {
      return false;
    }
  }

  finishAuthentication(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      return error;
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.isAuthenticated()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(response => response.json())
  }
}
