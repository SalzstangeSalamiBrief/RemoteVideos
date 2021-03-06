const keySender = require('node-key-sender');
const { validateKey } = require('../../util/validator');

/**
 * Validates if a passed key in the body is allowed.
 * If that is the case then send the key to OS
 * @param {string} req.body.key
 * @param {Request} res
 */
function sendKeyToOS ({ body: { key } }, res) {
  const isKeyValid = validateKey(key);
  if (isKeyValid) {
    if (key === 'shift-n') {
      // next in playlist
      keySender.sendCombination(['shift', 'n']);
    } else {
      keySender.sendKey(key);
    }
  }
  const status = isKeyValid ? 202 : 403;
  res.status(status).end();
}

module.exports = {
  sendKeyToOS,
};
