/**
 * file for the localstorage
 */
class JWTStorage {
  /**
   * set a cookie with the token of the user
   * @param {String} token
   */
  setAuthToken (token, username) {
    // set expiration date for a week
    document.cookie = `RemoteVideosCookie=${JSON.stringify({
      token,
      username,
    })};max-age=604800`;
  }

  /**
   * get the authtoken from the cookie of this app
   */
  getAuthToken () {
    const cookieToGet = `; ${document.cookie}`;
    const parts = cookieToGet.split('; RemoteVideosCookie=');
    if (parts.length === 2) {
      const match = parts
        .pop()
        .split(';')
        .shift();
      if (match) {
        return JSON.parse(match);
      }
    }
    return { username: '', token: '' };
  }

  /**
   * delete the cookie
   */
  clearStorage () {
    document.cookie = 'RemoteVideosCookie=;max-age=-1';
  }
}

export default new JWTStorage();
