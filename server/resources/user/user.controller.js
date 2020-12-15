const { hashNewUser, checkPasswordHash } = require('../../helpers/hashing');
const { validatePassword, validateUsername } = require('../../helpers/validator');
const { findUserByName } = require('../../db/queries/partial/user');
const { generateJWTToken, verifyJWTToken } = require('../../helpers/jwt');

/**
 * Controller for registering a new user
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
const createUserInDB = async ({ body: { username, password } }, res) => {
  const user = await findUserByName(username);
  if (!user) {
    // if the username is not valid
    if (!validateUsername()) {
      return res.status(406).end();
    }
    // if the pw is not valid
    if (!validatePassword(password)) {
      return res.status(406).end();
    }
    // hash user and send success answer
    await hashNewUser(username, password);
    console.log('register succesfully');
    return res.status(201).end();
  }
  // user already exists
  return res.status(406).end();
};

/**
 * Controller for logging out
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
const logUserIn = async ({ body: { username, password } }, res) => {
  if (!validatePassword(password)) {
    return res.status(406).end();
  }
  console.log(validateUsername(username));
  if (!validateUsername(username)) {
    return res.status(406).end();
  }
  // entered password does not match with the password in the db
  const pwHashCheck = await checkPasswordHash(username, password);
  if (!pwHashCheck) {
    return res.status(406).end();
  }
  // the password in the db and request are the same
  const token = generateJWTToken(username);
  return res.status(202).send({ token });
};

/**
 * Controller for validatiing a JWT
 * @param {Object} req
 */
const validateJWT = async (req, res) => {
  const sendedToken = req.headers.authorization.split('Bearer ')[1];
  if (!sendedToken || !req.body.username) {
    return res.status(401).end({ isVerified: false });
  }
  const existingUser = await findUserByName(req.body.username);
  if (existingUser.username !== req.body.username) {
    return res.status(401).end({ isVerified: false });
  }
  try {
    const isVerified = await verifyJWTToken(req.body.username, sendedToken);
    if (isVerified) {
      return res.status(202).send({ isVerified });
    }
    return res.status(401).send({ isVerified });
  } catch (err) {
    console.log(err);
    return res.status(401).send(false);
  }
};

module.exports = {
  createUserInDB,
  logUserIn,
  validateJWT,
};
