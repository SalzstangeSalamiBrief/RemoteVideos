const express = require('express');
const keySender = require('node-key-sender');
const Validator = require('../helpers/validator.js');

const router = express.Router();
/**
 * Route for receiving a key and send it to the os
 */
router.post('/sendKey', (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (Validator.validateKey(key)) {
    if (key === 'shift-n') {
      // next in playlist
      keySender.sendCombination(['shift', 'n']);
      return;
    }
    keySender.sendKey(key);
  }
  res.send({ succ: true });
  // !! Issue: node-key-sender has up to 1 second delay
});

module.exports = router;
