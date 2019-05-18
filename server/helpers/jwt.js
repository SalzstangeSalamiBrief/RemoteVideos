const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(
  path.join(__dirname, '../private/rsa/jwt/private.key'),
  'utf-8',
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../private/rsa/jwt/public.key'),
  'utf-8',
);

/**
 * generate jwt for a user
 * @param {String} username
 */
function generateJWTToken (username) {
  const payload = { user: username };
  const signOptions = { expiresIn: '7d', algorithm: 'RS256', issuer: username };
  return jwt.sign(payload, privateKey, signOptions);
}

// verifyJWTToken(req.body.username, req.body.token)
/**
 * Verifies if the token owns to the user
 * @param {String} username
 * @param {String} token
 */
function verifyJWTToken (username, token) {
  const verifyOptions = { exp: '7d', algorithm: ['RS256'], issuer: username };
  return jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
    // username does not own the token
    if (err) {
      return false;
    }
    // username does own the token
    return true;
  });
}

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
