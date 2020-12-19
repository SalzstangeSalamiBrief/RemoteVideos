const { Router } = require('express');
const controller = require('../controller/user.controller');

const router = Router();

router.route('/register').post(controller.createUserInDB);

router.route('/login').post(controller.logUserIn);

router.route('/checkToken').post(controller.validateJWT);

module.exports = router;
