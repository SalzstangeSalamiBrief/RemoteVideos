/**
 * file for the localstorage
 */
class Cookie {
  /**
   * set a cookie with the token of the user
   * @param {String} token
   */
  setAuthToken (token, username) {
    document.cookie = `RemoteVideosCookie=${JSON.stringify({
      token,
      username,
    })};max-age=604800`;
  }

  /**
   * get the authtoken from the cookie of this app
   */
  getAuthToken () {
    let match;
    const cookieToGet = `; ${document.cookie}`;
    const parts = cookieToGet.split('; RemoteVideosCookie=');
    if (parts.length === 2) {
      match = parts
        .pop()
        .split(';')
        .shift();
    }
    if (match) {
      return JSON.parse(match);
    }
    return undefined;
  }

  /**
   * delete the cookie
   */
  deleteCookie () {
    document.cookie = 'RemoteVideosCookie=;max-age=0';
  }
}

export default new Cookie();
