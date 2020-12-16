/**
 * file which hashes a pw of an user
 */
const bcrypt = require('bcryptjs');
// import user-query
const { createNewUser, findUserByName } = require('../db/queries/partial/user');

async function hashNewUser (username, password) {
  try {
    bcrypt.genSalt(10, (errInSaltGen, salt) => {
      if (errInSaltGen) {
        return console.log(errInSaltGen);
      }
      bcrypt.hash(password, salt, (errInHas, hash) => {
        if (errInHas) {
          return console.log(errInHas);
        }
        createNewUser(username, hash)
          .then(() => console.log('succ'))
          .catch((err) => console.log(err));
      });
    });
  } catch (error) {
    console.log(error);
  }
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
  hashNewUser,
  checkPasswordHash,
};
