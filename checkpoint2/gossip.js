const fs = require('fs');
const express = require('express');
const request = require('request-promise');

const MOVIES = fs.readFileSync('./movies.txt', 'utf-8').split(/\r?\n/);

const STATE = {};

const args = process.argv;
const OWN_PORT = args[2];
const PEER_PORT = args[3];

const app = express();


app.post('/gossip', (req, res) => {

});

setInterval(() => {
  const favoriteMovie = STATE[OWN_PORT].favoriteMovie;
  const newFavorite = MOVIES[Math.round(Math.random() * MOVIES.length])];
  console.log('I don\'t like ' + favoriteMovie + ' anymore. My new favorite movie is ' + newFavorite);
  STATE[OWN_PORT].favoriteMove = newFavorite;
  STATE[OWN_PORT].version += 1;
}, 8000);

setInterval(() => {
  console.log(STATE);
}, 3000);


app.listen(OWN_PORT, () => {
  console.log('Listening on port ' + OWN_PORT);
});