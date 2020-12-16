/* eslint-disable no-async-promise-executor */
import Login from '../assets/js/login';

// export default function AuthMiddleware ({ store, redirect, req }) {

export default function AuthMiddleware ({ store, redirect, req }) {
  // return new Promise(async (resolve, reject) => {
  return new Promise(async (resolve) => {
    let tokenValidation;
    // // if the process is on the server redirect to login
    if (process.server) {
      const isRequest = req && req.headers.cookie;
      if (isRequest) {
        const { username, token } = JSON.parse(
          req.headers.cookie.split('=', 2)[1],
        );
        tokenValidation = await Login.checkKey(username, token);
        console.log(tokenValidation);
      }
    } else {
      // else read the cookie from the clients browser
      tokenValidation = await Login.checkKey();
    }
    if (tokenValidation) {
      store.commit('userProfile/login');
      return resolve();
    }
    // default redirect to /
    store.dispatch('error/showError', 'Invalid User. Please log in!');
    // reject(redirect('/'));
    resolve(redirect('/'));
  });
}
