const keySender = require('node-key-sender');
const Validator = require('../helpers/validator');

/**
 * Validates if a passed key in the body is allowed.
 * If that is the case then send the key to OS
 * @param {string} req.body.key
 * @param {Request} res
 */
function sendKeyToOS ({ body: { key } }, res) {
  const isKeyValid = Validator.validateKey(key);
  if (isKeyValid) {
    if (key === 'shift-n') {
      // next in playlist
      keySender.sendCombination(['shift', 'n']);
      return;
    }
    keySender.sendKey(key);
    res.status(202).end();
  }
  res.status(403).end();
}

module.exports = {
  sendKeyToOS,
};
