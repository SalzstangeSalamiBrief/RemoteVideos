const express = require('express');

const router = express.Router();

const { hashNewUser, checkPasswordHash } = require('../helpers/hashing');
const { validatePassword, validateUsername } = require('../helpers/validator');
const { findUserByName } = require('../db/queries/partial/user');
const { generateJWTToken, verifyJWTToken } = require('../helpers/jwt');

router.get('/', (req, res) => {
  res.send('Hello World');
});

/**
 * Route for registering a new user
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  // user does not exist
  const user = await findUserByName(username);
  if (!user) {
    // if the username is not valid
    if (!validateUsername()) {
      return res.status(406).send({ err: 'Invalid username' });
    }
    // if the pw is not valid
    if (!validatePassword(password)) {
      return res.status(406).send({ err: 'Invalid password' });
    }
    // hash user and send success answer
    hashNewUser(username, password);
    return res.status(201).send({ success: 'User successfully registered' });
  }
  // user already exists
  return res.status(406).send({ err: 'User already exists' });
});

/**
 * Route for logging out
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  console.log(username, password);
  // invalid password
  if (!validatePassword(password)) {
    return res.status(406).send({ err: 'wrong credentials 1' });
  }
  if (!validateUsername(username)) {
    return res.status(406).send({ err: 'wrong credentials 2' });
  }
  // const isValidPassword = await checkPasswordHash(username, password);
  // entered password does not match with the password in the db
  if (!checkPasswordHash(username, password)) {
    return res.status(406).send({ err: 'wrong credentials 3' });
  }
  // the password in the db and request are the same
  const token = generateJWTToken(username);
  res.status(202).send({ token });
});

/**
 * Route for logging out
 * @param {String} req.body.username
 * @param {String} req.body.token
 */
router.post('/logout', async (req, res) => {
  // 1. first delete the token in the client
  const isVerified = await verifyJWTToken(req.body.username, req.body.token);
  // res.send(verifyJWTToken(req.body.username, req.body.token));
  // console.log(req.body);
  res.send(isVerified);
});

module.exports = router;