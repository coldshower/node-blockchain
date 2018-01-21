const request = require('request-promise');

const URL = 'http://localhost:3000';

function getBalance(name) {
  request(URL + '/balance?name=' + name)
  .then(console.log)
  .catch(console.error);
}

function createUser(name) {
  request({
    uri: URL + '/users',
    method: 'POST',
    body: {
      name
    },
    json: true
  })
  .then(console.log)
  .catch(console.error);
}

function transfer(from, to, amount) {
  request({
    uri: URL + '/transfers',
    method: 'POST',
    body: {
      from,
      to,
      amount
    },
    json: true
  })
  .then(console.log)
  .catch(console.error);
}