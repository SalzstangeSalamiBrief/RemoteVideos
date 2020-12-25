const { hashPassword, checkPasswordHash } = require('../helpers/hashing');
const { validatePassword, validateUsername } = require('../helpers/validator');
const { findUserByName, createNewUser } = require('../db/queries/partial/user');
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
  let status = 406;
  const doesUserAlreadyExist = await findUserByName(username);
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);
  const areParamsValid = isUsernameValid && isPasswordValid;
  if (!doesUserAlreadyExist && areParamsValid) {
    try {
      const hash = await hashPassword(password);
      await createNewUser(username, hash);
      console.log('register successfully');
      status = 201;
    } catch (err) {
      console.log(err);
    }
  }
  return res.status(status).end();
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
async function logUserIn ({ body }, res) {
  const { username, password } = body;
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
async function validateJWT ({ headers, body }, res) {
  const sendedToken = headers.authorization.split('Bearer ')[1];
  const { username } = body;
  const areParamsValid = sendedToken && username;
  // init response params
  let isVerified = false;
  if (areParamsValid) {
    const existingUser = await findUserByName(username);
    const isExistingUserThePassedUser = existingUser.username === username;
    if (isExistingUserThePassedUser) {
      try {
        isVerified = verifyJWTToken(username, sendedToken);
      } catch (err) {
        console.log(err);
      }
    }
  }
  const status = isVerified ? 202 : 401;
  return res.status(status).send({ isVerified });
}

module.exports = {
  createUserInDB,
  logUserIn,
  validateJWT,
};
