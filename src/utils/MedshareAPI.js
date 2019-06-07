const axios = require('axios');
import API_URL  from './constants';

module.exports = {
  post: function(payload) {
    return new Promise(function(resolve, reject) {
      axios.post(API_URL+'/product/', payload)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
    });
  },
};
