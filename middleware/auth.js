import Login from '../helpers/login';

export default function ({
  store,
  redirect,
  // route, req,
}) {
  return new Promise(async (resolve) => {
    // if the process is on the server redirect to login
    if (process.server) {
      return resolve();
    }
    const tokenValidation = await Login.checkKey();
    console.log(tokenValidation);
    // validate the token and if its valid log in and let the navigation proceed
    if (tokenValidation) {
      store.commit('userProfile/login');
      return resolve();
    }
    return resolve(redirect('/'));
  });
}
