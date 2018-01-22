const fs = require('fs');
const express = require('express');
const request = require('request-promise');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const MOVIES = fs.readFileSync('./movies.txt', 'utf-8').split(/\r?\n/);

const args = process.argv;
const OWN_PORT = args[2];
const PEER_PORT = args[3];

const app = express();

const STATE = {
  [OWN_PORT]: {
    favoriteMovie: pickRandomMovie(),
    version: 1
  }
};

if (PEER_PORT) {
  STATE[PEER_PORT] = null;
}

app.use(bodyParser.json());

app.post('/gossip', (req, res) => {
  const theirState = req.body.state;
  updateState(theirState);
  res.json({ state: STATE });
});

setInterval(() => {
  const favoriteMovie = STATE[OWN_PORT].favoriteMovie;
  const newFavorite = pickRandomMovie();
  console.log('I don\'t like ' + chalk.red(favoriteMovie) + ' anymore.');
  STATE[OWN_PORT].favoriteMovie = newFavorite;
  STATE[OWN_PORT].version += 1;
  console.log('My new favorite movie is ' + chalk.green(newFavorite));
}, 13000);

setInterval(() => {
  gossipWithAll()
  .then(renderState)
}, 5000);


app.listen(OWN_PORT, () => {
  console.log('Listening on port ' + OWN_PORT);
  console.log('My favorite movie now is ' + chalk.green(STATE[OWN_PORT].favoriteMovie));
});

function pickRandomMovie() {
  return MOVIES[Math.round(Math.random() * MOVIES.length)];
}

function renderState() {
  console.log(chalk.blue('----------------------------------'));
  for (let key in STATE) {
    if (STATE[key]) {
      console.log(key + '\'s favorite movie is ' + chalk.yellow(STATE[key].favoriteMovie));
    }
  }
  console.log(chalk.blue('----------------------------------'));
}

function gossipWithAll() {
  const peerPorts = Object.keys(STATE).filter(port => port !== OWN_PORT);

  return Promise.map(peerPorts, (peerPort) => {
    console.log('Gossiping with ' + peerPort);
    return request({
      uri: 'http://localhost:' + peerPort + '/gossip',
      method: 'POST',
      body: {
        state: STATE
      },
      json: true
    })
    .then(result => {
      updateState(result.state);
    })
    .catch(error => {
      console.log('Removing ' + peerPort + ' from clique.');
      delete STATE[peerPort];
    });
  });
}

function updateState(newState) {
  for (let port in newState) {
    if (!STATE[port]) {
      STATE[port] = newState[port];
    } else {
      if (newState[port] && newState[port].version > STATE[port].version) {
        STATE[port] = newState[port];
      }
    }
  }
}