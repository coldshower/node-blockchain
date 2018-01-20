const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const BALANCES = {
  john: 1000000
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/balance', (req, res) => {
  const user = req.query.user;
  res.send(user + ' has ' + BALANCES[user]);
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  BALANCES[name] = BALANCES[name] || 0;
  res.send(name + ' has been created!');
});

app.post('/transfers', (req, res) => {

});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});