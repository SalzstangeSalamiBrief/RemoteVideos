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
    const isUsernameValid = Validator.validateUsername(username);
    const isPasswordValid = Validator.validatePassword(password);
    console.log(isUsernameValid, isPasswordValid);
    if (isUsernameValid && isPasswordValid) {
      try {
        const response = await fetch(`${this.url}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        console.log(response.status);
        return response.status;
      } catch (err) {
        return { err: 'Could not register this user 2' };
      }
    }
    return { err: 'Could not register this user' };
  }
}

export default new UserRegistration();
