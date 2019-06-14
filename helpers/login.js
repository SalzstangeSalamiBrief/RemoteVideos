/**
 * Class for the login and logout feature
 */
import Validator from './validator';
import Cookie from './cookie';
// TODO: Add
class Login {
  constructor () {
    this.loginURL = `http://${process.env.HOST}:${process.env.PORT}/users`;
  }

  /**
   * check if the jwt is valid
   * @param {String} username
   */
  async checkKey (username) {
    const token = Cookie.getAuthToken();
    console.log(token);
    if (token) {
      const response = await fetch(`${this.loginURL}/check-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ token, username }),
      });
      if (response.status !== 202) {
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * Return a jwt-token, if the given credetials are correct.
   * @param {String} username
   * @param {String} password
   */
  async login (username = '', password = '') {
    if (!Validator.validateUsername(username)) {
      // todo err
      return false;
    }
    if (!Validator.validatePassword(password)) {
      // todo err
      return false;
    }
    const response = await fetch(`${this.loginURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status !== 202) {
      return { err: 'Invalid Credentials' };
    }
    const content = await response.json();
    return content;
  }

  logout () {
    return this.loginURL;
  }
}

export default new Login();
