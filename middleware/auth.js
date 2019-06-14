import Login from '../helpers/login';

export default function ({ store, redirect }) {
  return new Promise(async (resolve) => {
    if (store.state.userProfile.isLoggedIn === false) {
      console.log('hi');
      const keyValidation = await Login.checkKey();
      if (keyValidation) {
        // set in STore
        store.commit('userProfile/login');
        return resolve(true);
      }
    }
    // TODO ERR
    return resolve(redirect('/'));
  });
}
