const crypto = require('crypto');

const NUM_ZEROES = 4;

let zeroString = '';

for (let i = 0; i < NUM_ZEROES; i++) {
  zeroString += '0';
}

function findNonce(message) {
  let count = 0;
  let nonce = getRandomString();
  while (!isEnoughZeroes(message, nonce)) {
    nonce = getRandomString();
    count += 1;
  }
  console.log('count', count);
  return nonce;
}

function hash(message) {
  return crypto.createHash('md5').update(message).digest('hex');
}

function getRandomString() {
  // this can be more systematic so we don't retry any nonces
  const randomLength = Math.floor(Math.random() * 100);
  return crypto.randomBytes(randomLength).toString('hex');
}

function isEnoughZeroes(message, nonce) {
  const digest = hash(message + nonce);
  return digest.slice(0, NUM_ZEROES) === zeroString;
}