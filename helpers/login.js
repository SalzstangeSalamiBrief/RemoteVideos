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
  async checkKey (passedUsername, passedToken) {
    // let token = '';
    const credentials = { username: '', token: '' };
    // console.log('_________________');
    // console.log(username);
    // console.log(passedToken);
    if (passedUsername && passedToken) {
      credentials.username = passedUsername;
      credentials.token = passedToken;
    } else {
      const { token, username } = Cookie.getAuthToken();
      console.log(token, username);
      credentials.username = username;
      credentials.token = token;
    }
    // console.log(credentials);
    // const credentials = passedToken || Cookie.getAuthToken();
    // console.log(token);
    if (credentials) {
      const response = await fetch(`${this.loginURL}/check-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(credentials),
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
    console.log(username);
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
