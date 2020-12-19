import Login from '../assets/js/login';

export default async function Temp ({
  route: { fullPath }, store, redirect, req,
}) {
  const { isLoggedIn } = store.state.userProfile;
  let username;
  let token;
  console.log(`process.server: ${process.server}, isLoggedIn: ${isLoggedIn}`);
  if (!isLoggedIn) {
    if (process.server) {
      const { cookie } = req.headers;
      if (cookie) {
        ({ username, token } = JSON.parse(cookie.split('=', 2)[1]));
      }
    }
    const areCredentialsAlive = username && token;
    if (areCredentialsAlive) {
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
