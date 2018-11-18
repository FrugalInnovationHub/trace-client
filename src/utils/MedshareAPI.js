const axios = require('axios');


module.exports = {
  post: function(payload) {
    return new Promise(function(resolve, reject) {
      axios.post('http://localhost:3001/api/product/', payload)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
    });
  },
};
