/**
 * file which hashes a pw of an user
 */
const bcrypt = require('bcryptjs');
// import user-query
const {createNewUser, findUserByName} = require('../db/queries/partial/user');

// todo test
function hashNewUser(username, password) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        throw error;
      }
      createNewUser(username, hash)
        .then(() => console.log('succ'))
        .catch(err => console.log(err));
    });
  });
}

/**
 * Check if the entered Password is equal with the same hashed password * of an user
 * @param {String} username
 * @param {String} password
 */
async function checkPasswordHash(username, password) {
  const user = await findUserByName(username);
  console.log(user);
  if (user.length === 0) {
    return false;
  }
  const hashedUserPassword = user.password;
  return bcrypt
    .compare(password, hashedUserPassword)
    .then(res => res)
    .catch(err => console.log(err));
}

module.exports = {
  hashNewUser,
  checkPasswordHash,
};
