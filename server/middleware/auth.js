const { validateKey, validateUsername } = require('../helpers/validator');
const { verifyJWTToken } = require('../helpers/jwt');

/**
 * Fuction for validation if the passed username, token and key is valid.
 * If not, send an error, else return with next()
 */
function auth ({ body }, res, next) {
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
}

module.exports = { auth };
