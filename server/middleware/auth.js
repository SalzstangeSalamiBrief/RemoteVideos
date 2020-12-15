const { validateKey, validateUsername } = require('../helpers/validator');
const { verifyJWTToken } = require('../helpers/jwt');

/**
 * Fuction for validation if the passed username, token and key is valid.
 * If not, send an error, else return with next()
 */
module.exports.auth = ({ body }, res, next) => {
  const { key, token: credentials } = body;
  if (validateKey(key)) {
    if (validateUsername(credentials.username)) {
      if (verifyJWTToken(credentials.username, credentials.token)) {
        return next();
      }
    }
  }
  return res.status(401).send({ err: 'invalid credentials' });
};
