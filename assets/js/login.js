/**
 * Class for the login and logout feature
 */
import { validatePassword, validateUsername } from '../../util/validator';
import JWTStorage from './JWTStorage';

class Login {
  constructor () {
    this.loginURL = `http://${process.env.HOST}:${process.env.PORT_BACKEND}/users`;
    this.fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: {},
    };
  }

  /**
   * check if the jwt is valid
   * @param {String} username
   */
  async checkKey (username, token) {
    const isUsernameValid = validateUsername(username);
    if (isUsernameValid && token) {
      try {
        const options = { ...this.fetchOptions };
        options.headers.Authorization = `Bearer ${token}`;
        options.body = JSON.stringify({
          username,
        });
        const response = await fetch(`${this.loginURL}/checkToken`, options);
        return response.status === 202;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  async postKey (username, password, token) {
    const areCredentialsValid = validateUsername(username) && token && validatePassword(password);
    if (areCredentialsValid) {
      const options = { ...this.fetchOptions };
      options.headers.Authorization = `Bearer ${token}`;
      options.body = JSON.stringify({
        username,
        password,
      });
      try {
        const response = await fetch(`${this.loginURL}/checkToken`, options);
        return response.status === 202;
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  /**
   * Return a jwt-token, if the given credetials are correct.
   * @param {String} username
   * @param {String} password
   */
  async login (username = '', password = '') {
    const areParamsValid = validateUsername(username) && validatePassword(password);
    if (areParamsValid) {
      const options = { ...this.fetchOptions };
      options.body = JSON.stringify({ username, password });
      try {
        const response = await fetch(`${this.loginURL}/login`, options);
        if (response.status !== 202) {
          return { error: 'Invalid Credentials' };
        }
        const { token } = await response.json();
        JWTStorage.setAuthToken(token, username);
        return { token };
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  }

  logout () {
    return this.loginURL;
  }
}

export default new Login();
