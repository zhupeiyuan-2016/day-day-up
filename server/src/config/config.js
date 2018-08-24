// default config
// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
// };
module.exports = {
  workers: 1
  // createServer: function(callback) {
  //   return https.createServer(options, callback);
  // }

};
