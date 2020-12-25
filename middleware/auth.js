import Login from '../assets/js/login';
import JWTStorage from '../assets/js/JWTStorage';

/**
 *  grab the username and token from a cookie
 *  (which cookie depends where the mw is called (client or server))
 * If a username and a token exist, then try to log the user in.
 * If the user could not get logged in then check if the targeted Route is /remote.
 * If that is the case, then redirect to /login
 * @param {context} param0
 */
export default async function Temp ({
  route: { fullPath }, store, redirect, req,
}) {
  let username;
  let token;
  if (process.server && !req) return;
  // console.log(`process.server: ${process.server}, isLoggedIn: ${isLoggedIn}`);
  if (process.server) {
    const { cookie } = req.headers;
    if (cookie) {
      ({ username, token } = JSON.parse(cookie.split('=', 2)[1]));
    }
  } else {
    ({ username, token } = JWTStorage.getAuthToken());
  }
  const areCredentialsAlive = username && token;
  if (areCredentialsAlive) {
    const isTokenValid = await Login.checkKey(username, token);
    if (isTokenValid) {
      store.commit('userProfile/login');
      store.commit('userProfile/setUsername', username);
    }
  }

  const { isLoggedIn } = store.state.userProfile;
  const isRemoteRouteTarget = fullPath === '/remote';
  const unauthorizedAccessOnControls = !isLoggedIn && isRemoteRouteTarget;
  if (unauthorizedAccessOnControls) {
    return redirect('/login');
  }
}
