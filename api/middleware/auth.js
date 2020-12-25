const { validateKey, validateUsername } = require('../../util/validator');
const { verifyJWTToken } = require('../helpers/jwt');

/**
 * Middle ware for validation of the /keys/sendKey route.
 * Check if the passed key, token and username is valid
 * If that is not the case, than return with a 401 status and send an error-object
 */
module.exports.auth = ({ body, headers }, res, next) => {
  const sendedToken = headers.authorization.split('Bearer ')[1];
  const isKeyValid = validateKey(body.key);
  const isUsernameValid = validateUsername(body.username);
  const isJWTTokenValid = verifyJWTToken(body.username, sendedToken);
  const areArgumentsValid = isKeyValid && isUsernameValid && isJWTTokenValid;
  if (areArgumentsValid) {
    return next();
  }
  return res.status(401).send({ err: 'invalid credentials' });
};
