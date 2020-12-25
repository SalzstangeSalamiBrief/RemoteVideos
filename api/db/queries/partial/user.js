/**
 * File which contains relevant Queries for the user-model
 */
const mongoose = require('mongoose');
// register schemas
require('../../models/User');

const User = mongoose.model('users');

/**
 * create a new user in the database
 * @param {String} username
 * @param {String} password
 */
async function createNewUser (username, password) {
  const newUser = new User({
    username,
    password,
  });
  const createdUser = await newUser.save();
  return createdUser.toObject();
}
/**
 * find a single user by the passed username
 * @param {String} username
 */
async function findUserByName (username) {
  const foundUser = await User.findOne({ username }).select('-_id -__v').lean();
  return foundUser;
}

module.exports = {
  createNewUser,
  findUserByName,
};
