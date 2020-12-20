const { hashNewUser, checkPasswordHash } = require('../helpers/hashing');
const { validatePassword, validateUsername } = require('../helpers/validator');
const { findUserByName } = require('../db/queries/partial/user');
const { generateJWTToken, verifyJWTToken } = require('../helpers/jwt');

/**
 * Controller for registering a new user
 * If the credentials in the body (username and password)
 *  are valid and the username does not already exist
 *  then a new user is created
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
async function createUserInDB ({ body: { username, password } }, res) {
  console.log(username, password);
  const doesUserAlreadyExist = await findUserByName(username);
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);
  if (!doesUserAlreadyExist && isUsernameValid && isPasswordValid) {
    await hashNewUser(username, password);
    console.log('register successfully');
    return res.status(201).end();
  }
  return res.status(406).end();
}

/**
 * Controller for logging in
 * If the username and password of the req-body are valid
 *  then the server checks if the credentials are valid by
 *  hashing them and compare the result with the hashed data
 *  in the database
 * If the checks pass, then sign and send back a new jwt-token
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
async function logUserIn ({ body: { username, password } }, res) {
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);
  if (isUsernameValid && isPasswordValid) {
    const doCredentialsMatch = await checkPasswordHash(username, password);
    if (doCredentialsMatch) {
      const token = generateJWTToken(username);
      return res.status(202).send({ token });
    }
  }
  return res.status(406).end();
}

/**
 * Function for validation of a jwt token
 * In the Request-Header the field authorization with a string
 *  of the format `Bearer ${token}` is required.
 * The Body requires the username
 * Verifies the sended token and username and send a true or false back
 * @param {String} req.headers.authorization
 * @param {String} req.body.username
 */
async function validateJWT ({ headers: { authorization }, body: { username } }, res) {
  const sendedToken = authorization.split('Bearer ')[1];
  const areParamsValid = sendedToken && username;
  if (areParamsValid) {
    const existingUser = await findUserByName(username);
    const isExistingUserThePassedUser = existingUser.username === username;
    if (isExistingUserThePassedUser) {
      try {
        const isVerified = await verifyJWTToken(username, sendedToken);
        if (isVerified) {
          return res.status(202).send({ isVerified });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return res.status(401).end({ isVerified: false });
}

module.exports = {
  createUserInDB,
  logUserIn,
  validateJWT,
};
