const { Router } = require('express');
const controller = require('./user.controller');

const router = Router();

router.route('/register').post(controller.createUserInDB);

router.route('login').post(controller.logUserIn);

router.route('/check-key').post(controller.validateJWT);

module.exports = router;