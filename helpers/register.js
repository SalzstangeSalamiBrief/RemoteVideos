/**
 * Class for registering a user
 */
import Validator from './validator';

class UserRegistration {
  constructor () {
    this.url = `http://${process.env.HOST}:${process.env.PORT}`;
  }

  /**
   * Register a user with the given username and password on the server
   * If the username or pasword is invalid return an err-object
   * if the process of registering does not success (status is not 201) an err-object
   * @param {String} username
   * @param {String} password
   */
  async registerUser (username = '', password = '') {
    if (!Validator.validateUsername(username)) {
      // todo err
      return { err: 'Could not register this user' };
    }
    if (!Validator.validatePassword(password)) {
      // todo err
      return { err: 'Could not register this user' };
    }
    try {
      const response = await fetch(`${this.url}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status !== 201) {
        return { err: 'Could not register this user' };
      }
      return { succ: 'Register successfully' };
    } catch (err) {
      return { err: 'Could not register this user' };
    }
  }
}

export default new UserRegistration();
