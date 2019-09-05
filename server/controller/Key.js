const robot = require('robotjs');
const express = require('express');
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
      robot.keyToggle('shift', 'down');
      robot.keyTap('n');
      robot.keyToggle('shift', 'up');
      return;
    }
    robot.keyTap(key);
  }
  res.send({ succ: true });
  // no res needed
});

module.exports = router;
