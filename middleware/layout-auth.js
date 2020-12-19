import Login from '../assets/js/login';
import JWTStorage from '../assets/js/JWTStorage';

export default async function Temp ({
  route: { fullPath }, store, redirect, req,
}) {
  console.log(fullPath);
  const { isLoggedIn } = store.state.userProfile;
  let username;
  let token;
  console.log(`process.server: ${process.server}, isLoggedIn: ${isLoggedIn}`);
  if (!isLoggedIn) {
    if (process.server) {
      const { cookie } = req.headers;
      console.log(cookie);
      ({ username, token } = JSON.parse(cookie.split('=', 2)[1]));
    } else {
      console.log('token ls');
      ({ username, token } = JWTStorage.getAuthToken());
    }

    if (username && token) {
      const isTokenValid = await Login.checkKey(username, token);
      if (isTokenValid) {
        store.commit('userProfile/login');
        store.commit('userProfile/setUsername', username);
      }
    }
    return;
  }

  const isRemoteRouteTarget = fullPath === '/remote';
  if (isRemoteRouteTarget) {
    console.log('before redircet');
    return redirect('/login');
  }
}
