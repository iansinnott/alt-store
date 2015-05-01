var request = require('superagent');

var ItemAPI = {
  fetch(cb) {
    request
      .get('/api/items')
      .end(cb);
  }
};

module.exports = ItemAPI;
