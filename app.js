const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const BALANCES = {
  john: 1000000
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/balance', (req, res) => {
  const name = req.query.name;
  
  res.send(name + ' has ' + BALANCES[name]);

  console.log(BALANCES);
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  BALANCES[name] = BALANCES[name] || 0;
  
  res.send(name + ' has been created!');

  console.log(BALANCES);
});

app.post('/transfers', (req, res) => {
  const from = req.body.from.toLowerCase();
  const to = req.body.to.toLowerCase();
  const amt = +req.body.amount;

  if (BALANCES[from] >= amt) {
    BALANCES[from] -= amt;
    BALANCES[to] += amt;
    res.send(amt + ' has been transferred from ' + from + ' to ' + to);
  } else {
    res.send(from + ' does not have that much money to give.');
  }
  console.log(BALANCES);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});