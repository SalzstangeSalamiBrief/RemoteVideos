/**
 * File for seeding data
 */
const mongoose = require('mongoose');
// import models
const UserModel = require('./models/User');

/**
 * Function for connectiong to mongodb via mongoose
 */
function connectToDB () {
  // connect mongoose
  return mongoose
    .connect(
      'mongodb://localhost/DungeonCleaner',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    )
    .then(() => console.log('connected to mongoDB'))
    .catch((e) => console.log(e));
}

/**
 * function for disconnecting from mongodb via mongoose
 */
function disconnectFromDB () {
  return mongoose.disconnect();
}

/**
 * Function for dropping all collections
 */
// function clearDB () {
//   return new Promise((resolve) => {
//     mongoose.connection.db.dropDatabase();
//     resolve(true);
//   });
// }

function seedData () {
  connectToDB()
    .then(() => {
      const testUser = new UserModel({
        username: 'testtest',
        password: 'testpassword',
      });
      return testUser.save();
    })
    .then(() => disconnectFromDB())
    .catch((err) => console.log(err));
}

seedData();
