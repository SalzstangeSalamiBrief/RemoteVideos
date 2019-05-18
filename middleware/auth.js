import Login from '../helpers/login';

export default function ({ store, redirect }) {
  return new Promise(async (resolve) => {
    console.log(store.state.userProfile.isLoggedIn);
    if (store.state.userProfile.isLoggedIn) {
      const keyValidation = await Login.checkKey();
      if (keyValidation) {
        // set in STore
        store.commit('userProfile/login');
        return resolve(true);
      }
    }
    // TODO ERR
    return resolve(redirect('/'));
    // return resolve(false);
  });
}
