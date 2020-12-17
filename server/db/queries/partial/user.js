/**
 * File which contains relevant Queries for the user-model
 */
const mongoose = require('mongoose');
// register schemas
require('../../models/User');

const User = mongoose.model('users');

/**
 * Function which creates a new user
 * @param {String} username
 * @param {String} password
 */
function createNewUser (username, password) {
  const newUser = new User({
    username,
    password,
  });
  return newUser.save();
}
/**
 * Function which finds a user by his name
 * @param {String} username
 */
function findUserByName (username) {
  return User.findOne({ username })
    .select('-_id -__v')
    .exec();
}

module.exports = {
  createNewUser,
  findUserByName,
};
