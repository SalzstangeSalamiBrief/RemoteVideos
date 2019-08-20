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
  // todo check if key exists and is valid => if not generate a new one and send him
  const token = generateJWTToken(username);
  return res.status(202).send({ token });
});
/**
 * Route for logging out
 * @param {String} req.body.username
 * @param {String} req.body.token
 */

/**
 * Route for checking, if the key of the user valid
 * @param {String} req.body.username
 * @param {String} req.body.token
 */
router.post('/check-key', async (req, res) => {
  try {
    const isVerified = await verifyJWTToken(req.body.username, req.body.token);
    if (isVerified) {
      return res.status(202).send({ isVerified });
    }
    return res.status(401).send({ isVerified });
  } catch (err) {
    console.log(err);
    return res.status(401).send(false);
  }
});

module.exports = router;
