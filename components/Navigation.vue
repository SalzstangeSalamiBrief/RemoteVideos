<template>
  <nav
    class="nav-bg main-nav">
    <nuxt-link
      class="nav__brand text-xl font-semibold tracking-tight"
      tag="a"
      to="/">RemoteVideos</nuxt-link>
    <div class="center-item--horizontal">
      <ul class="nav__login-out center-item--horizontal">
        <li v-if="isLoggedIn">
          <nuxt-link
            class="btn text-white py-2 px-4 border border-white rounded nav-btn"
            tag="a"
            to="/remote">
            Controlls
          </nuxt-link>
        </li>
        <li v-if="!isLoggedIn">
          <nuxt-link

            class="btn text-white py-2 px-4 border border-white rounded nav-btn"
            tag="a"
            to="/login">
            Login
          </nuxt-link>
        </li>
        <li v-else>
          <a
            class="btn text-white py-2 px-4 border border-white rounded nav-btn"
            @click="logOut">
            Logout</a>
        </li>
      </ul>
      <ul class="nav__modes center-item--horizontal">
        <button
          v-for="mode in modes"
          :key="mode"
          :class="{'active-mode': activeMode === mode}"
          class="btn text-white py-2 px-4 border border-white rounded nav-btn mode-btn"
          @click="setMode(mode)">{{ mode }}</button>
      </ul>
    </div>

  </nav>
</template>
<script>
import Cookie from '../helpers/cookie';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.userProfile.isLoggedIn;
    },
    modes() {
      return Object.keys(this.$store.state.modes.keys);
    },
    activeMode() {
      return this.$store.state.modes.mode;
    },
  },
  methods: {
    /**
     * log the user out of the app
     */
    logOut() {
      Cookie.deleteCookie();
      this.$store.commit('userProfile/logout');
      //  bugfix
      window.location.href = `http://${process.env.HOST}:${process.env.PORT}/`;
    },
    setMode(mode) {
      this.$store.commit('modes/setMode', mode);
    },
  },
};
</script>
<style>
.active-mode{
 pointer-events: none;
 background: rgba(249,249,249, 0.2);
}
ul{
  list-style: none;
}
.mode-btn{
  text-transform: capitalize;
}
.nav-bg{
  background: var(--nav--bg-color);
}
.nav__brand{
  width: 200px;
  text-decoration: none;
  color: white;
  /* padding-left: 1rem; */
}
nav.main-nav{
  height: 70px;
  min-height: 70px;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .25rem;
}

a.nav-btn{
  text-decoration: none;
  font-size: 14px;
}
a.nav-btn:first-child{
  margin-right: 1rem;
}
.nav__modes button{
  margin-left: 1rem;
}

.nav__modes{
  border-left: 1px solid white;
  /* padding-left: 1rem; */
  padding: 0;
}
@media(max-width: 765px){
  nav.main-nav.loggedin{
  margin-top: 2rem;
}
}

</style>
