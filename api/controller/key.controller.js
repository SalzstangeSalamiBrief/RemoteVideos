const keySender = require('node-key-sender');
const Validator = require('../helpers/validator');

function sendKeyToOS ({ body: { key } }, res) {
  const isKeyValid = Validator.validateKey(key);
  if (isKeyValid) {
    if (key === 'shift-n') {
      // next in playlist
      keySender.sendCombination(['shift', 'n']);
      return;
    }
    keySender.sendKey(key);
  }
  res.status(202).end();
}

module.exports = {
  sendKeyToOS,
};
