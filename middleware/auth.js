import Login from '../helpers/login';

export default function ({ store, redirect, req }) {
  return new Promise(async (resolve, reject) => {
    // if the process is on the server redirect to login
    if (process.server && !req) return resolve();
    let tokenValidation;
    // check if the process is running on the server
    if (process.server) {
      // if the process is running on the server calc the tokenValidation-Object from the cookie of the requests header
      // if req.headers.cookie is falsy, redirect to /
      if (!req.headers.cookie) return resolve(redirect('/'));
      const { username, token } = JSON.parse(
        req.headers.cookie.split('=', 2)[1],
      );
      tokenValidation = await Login.checkKey(username, token);
    } else {
      // else read the cookie from the clients browser
      tokenValidation = await Login.checkKey();
    }
    // if the token is valid, log in and continue
    if (tokenValidation) {
      store.commit('userProfile/login');
      return resolve();
    }
    // default redirect to /
    // store.dispatch('error/showError', 'Invalid User. Please log in!');
    return reject();
  });
}
