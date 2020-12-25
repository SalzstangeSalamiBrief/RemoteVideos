/**
 * file which hashes a pw of an user
 */
const bcrypt = require('bcryptjs');
// import user-query
const { findUserByName } = require('../db/queries/partial/user');

/**
 * function which generates a salt and returns a promise
 */
function generateSalt () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
}

/**
 * Function which creates a hashed password.
 * @param {String} password
 */
async function hashPassword (password) {
  const salt = await generateSalt();
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

/**
 * Check if the entered Password is equal with the same hashed password * of an user
 * @param {String} username
 * @param {String} password
 */
async function checkPasswordHash (username, password) {
  const user = await findUserByName(username);
  if (!user) {
    return false;
  }
  const hashedUserPassword = user.password;
  return bcrypt
    .compare(password, hashedUserPassword)
    .then((res) => res)
    .catch((err) => console.log(err));
}

module.exports = {
  hashPassword,
  checkPasswordHash,
};
