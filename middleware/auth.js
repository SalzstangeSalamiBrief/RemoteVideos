import Login from '../helpers/login';

export default function ({
  // store,
  redirect,
  // route, req,
}) {
  return new Promise(async (resolve) => {
    if (process.server) {
      console.log('-----------------------------------------');
      console.log(true);
      console.log('-----------------------------------------');
    } else {
      console.log('-----------------------------------------');
      console.log(false);
      console.log('-----------------------------------------');
      const tokenValidation = await Login.checkKey();
      console.log(tokenValidation);
      // if (tokenValidation) {
      //   // set in STore
      //   store.commit('userProfile/login');
      //   return resolve(redirect('/remote'));
      // }
    }
    // if (route.path === '/remote') {
    //   const { cookie } = req.headers;
    //   // console.log(token);
    //   if (cookie) {
    //     const cookieContent = cookie.split('=');
    //     if (cookieContent.includes('RemoteVideosCookie')) {
    //       const token = cookieContent[1].split('-username-');
    //       const tokenValidation = await Login.checkKey(token[1], token[0]);
    //       console.log(tokenValidation);
    //       if (tokenValidation) {
    //         store.commit('userProfile/login');
    //         return resolve(true);
    //       }
    //     }
    //   }
    // }
    // console.log(route);

    return resolve(redirect('/'));
    // console.log(context);
    // console.log('--------------');
    // console.log(process.client);
    // console.log('--------------');
    // if (false) {
    //   console.log('server');
    // } else if (store.state.userProfile.isLoggedIn === false) {
    //   console.log('hi');
    //   const tokenValidation = await Login.checkKey();
    //   console.log(tokenValidation);
    //   if (tokenValidation) {
    //     // set in STore
    //     store.commit('userProfile/login');
    //     return resolve(true);
    //   }
    // }
    // console.log(store.state.userProfile.isLoggedIn);
    // if (store.state.userProfile.isLoggedIn === false) {
    //   console.log('hi');
    //   const tokenValidation = await Login.checkKey();
  });
}
