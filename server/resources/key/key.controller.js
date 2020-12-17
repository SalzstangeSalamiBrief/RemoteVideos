const keySender = require('node-key-sender');
const Validator = require('../../helpers/validator');

const sendKeyToOS = ({ body: { key } }, res) => {
  if (Validator.validateKey(key)) {
    if (key === 'shift-n') {
      // next in playlist
      keySender.sendCombination(['shift', 'n']);
      return;
    }
    keySender.sendKey(key);
  }
  res.status(202).end();
};

module.exports = {
  sendKeyToOS,
};
