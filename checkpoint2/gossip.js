const fs = require('fs');
const express = require('express');
const request = require('request-promise');
const chalk = require('chalk');

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

app.post('/gossip', (req, res) => {

});

setInterval(() => {
  const favoriteMovie = STATE[OWN_PORT].favoriteMovie;
  const newFavorite = pickRandomMovie();
  console.log('I don\'t like ' + chalk.red(favoriteMovie) + ' anymore.');
  STATE[OWN_PORT].favoriteMovie = newFavorite;
  STATE[OWN_PORT].version += 1;
  console.log('My new favorite movie is ' + chalk.green(newFavorite));
}, 8000);

setInterval(() => {
  console.log(STATE);
}, 3000);


app.listen(OWN_PORT, () => {
  console.log('Listening on port ' + OWN_PORT);
  console.log('My favorite movie now is ' + chalk.green(STATE[OWN_PORT].favoriteMovie));
});

function pickRandomMovie() {
  return MOVIES[Math.round(Math.random() * MOVIES.length)];
}