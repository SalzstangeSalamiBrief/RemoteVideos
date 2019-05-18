const fs = require('fs');

const path = require('path');

module.exports.createOptions = () => ({
  key: fs.readFileSync(
    path.join(__dirname, '../private/ssl/remvid-privkey.pem'),
  ),
  cert: fs.readFileSync(path.join(__dirname, '../private/ssl/remvid-cert.pem')),
});
