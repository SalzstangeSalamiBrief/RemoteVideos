const { Router } = require('express');
const controller = require('./key.controller');

const router = Router();

router.route('/sendKey').post(controller.sendKeyToOS);

module.exports = router;
