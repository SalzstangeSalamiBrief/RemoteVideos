const { validateKey, validateUsername } = require('../helpers/validator');
const { verifyJWTToken } = require('../helpers/jwt');

/**
 * Fuction for validation if the passed username, token and key is valid.
 * If not, send an error, else return with next()
 */
module.exports.auth = ({ body }, res, next) => {
  console.log(body.usename);
  console.log(validateUsername(body.username));
  if (validateKey(body.key)) {
    if (validateUsername(body.username)) {
      if (verifyJWTToken(body.username, body.token)) {
        return next();
      }
    }
  }
  return res.send({ err: 'invalid credentials' });
};
