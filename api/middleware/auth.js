const { validateKey, validateUsername } = require('../helpers/validator');
const { verifyJWTToken } = require('../helpers/jwt');

/**
 * Middle ware for validation of the /keys/sendKey route.
 * Check if the passed key, token and username is valid
 * If that is not the case, than return with a 401 status and send an error-object
 */
module.exports.auth = ({ body }, res, next) => {
  const { key, token: { username, token } } = body;
  const isKeyValid = validateKey(key);
  const isUsernameValid = validateUsername(username);
  if (isKeyValid && isUsernameValid) {
    const isJWTTokenValid = verifyJWTToken(username, token);
    if (isJWTTokenValid) {
      return next();
    }
  }
  return res.status(401).send({ err: 'invalid credentials' });
};
