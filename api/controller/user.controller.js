const { hashNewUser, checkPasswordHash } = require('../helpers/hashing');
const { validatePassword, validateUsername } = require('../helpers/validator');
const { findUserByName } = require('../db/queries/partial/user');
const { generateJWTToken, verifyJWTToken } = require('../helpers/jwt');

/**
 * Controller for registering a new user
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
async function createUserInDB ({ body: { username, password } }, res) {
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
 * Controller for logging out
 * @param {String} req.body.username
 * @param {String} req.body.password
 */
async function logUserIn ({ body: { username, password } }, res) {
  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);
  if (isUsernameValid && isPasswordValid) {
  // entered password does not match with the password in the db
    const pwHashCheck = await checkPasswordHash(username, password);
    if (!pwHashCheck) {
      return res.status(406).end();
    }
    // the password in the db and request are the same
    const token = generateJWTToken(username);
    return res.status(202).send({ token });
  }

  return res.status(406).end();
}

/**
 * Controller for validatiing a JWT
 * @param {Object} req
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
        return res.status(401).send({ isVerified });
      } catch (err) {
        console.log(err);
        return res.status(401).send(false);
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
