const crypto = require('crypto');

function BlockChain(message) {
  this.blocks = null;
  this.options = {
    difficulty: 4
  };
}

BlockChain.prototype.addGenesisBlock = function (message) {
  this.blocks = [new Block(null, message, this.options)];
};

BlockChain.prototype.addToChain = function (message) {
  const prevBlock = this.blocks[this.blocks.length - 1];
  const newBlock = new Block(prevBlock.hash, message, this.options);

  this.blocks.push(newBlock);
};

function Block(prevBlockHash, message, chainOptions) {
  this.prevBlockHash = prevBlockHash || '';
  this.message = message;

  const contents = this.prevBlockHash + this.message;
  const nonceAndHash = findNonceAndHash(contents, chainOptions.difficulty);
  this.nonce = nonceAndHash[0];
  this.hash = nonceAndHash[1];
}

function findNonceAndHash(data, difficulty) {
  let nonce = getRandomString();
  let currentHash = hash(nonce + data);
  while (!isEnoughZeros(currentHash, difficulty)) {
    nonce = getRandomString();
    currentHash = hash(nonce + data);
  }
  return [nonce, currentHash];
}

function getRandomString() {
  const digits = Math.floor((Math.random() * 100)) + 1;
  return crypto.randomBytes(digits).toString('hex');
}

function isEnoughZeros(digest, difficulty) {
  let zeroString = '';
  for (let i = 0; i < difficulty; i++) {
    zeroString += 1;
  }

  return digest.slice(0, difficulty) === zeroString;
}

function hash(raw) {
  return crypto.createHash('md5').update(raw).digest('hex');
}
