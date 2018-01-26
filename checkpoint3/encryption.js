const ursa = require('ursa');

const keyPair = ursa.generatePrivateKey();

const plaintext = new Buffer('Hello World');

const signed = keyPair.hashAndSign('md5', plaintext);

let pubKey = keyPair.toPublicPem('base64');

pubKey = ursa.createPublicKey(pubKey, 'base64');

console.log(pubKey.hashAndVerify('md5', plaintext, signed));