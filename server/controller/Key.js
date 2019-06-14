const robot = require('robotjs');
const express = require('express');
const Validator = require('../helpers/validator.js');

const router = express.Router();

/**
 * Route for receiving a key and send it to the os
 */
router.post('/sendKey', (req, res) => {
  const { key } = req.body;
  if (Validator.validateKey(key)) {
    console.log(key);
    if (key === 'shift-n') {
      console.log('next');
      // next in playlist
      robot.keyToggle('shift', 'down');
      robot.keyTap('n');
      robot.keyToggle('shift', 'up');
      return;
    }
    // todo shift n for next track
    robot.keyTap(key);
  }
  res.send({ succ: true });
  // no res needed
});

module.exports = router;
