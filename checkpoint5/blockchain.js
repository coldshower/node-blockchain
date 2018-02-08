function Block(prevBlock, message) {
  this.prevBlockHash = prevBlock.blockHash;
  this.message = message;
}

function BlockChain(message) {
  this.blocks = [new Block(null, message)];
}

BlockChain.prototype.addToChain = function (message) {
  const prevBlock = this.blocks[this.blocks.length - 1];
  const newBlock = new Block(prevBlock, message);

  this.blocks.push(newBlock);
};