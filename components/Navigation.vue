<template>
  <nav
    class="nav-bg flex justify-between items-center h-12 w-full px-2 py-4"
  >
    <nuxt-link
      class="h-8 text-white text-xl font-semibold"
      tag="a"
      to="/"
    >
      RemoteVideos
    </nuxt-link>
    <div class="nav__login-out flex justify-center items-center">
      <nuxt-link
        v-if="isLoggedIn"
        class="btn text-white py-2 px-4 border border-white rounded nav-btn"
        tag="a"
        to="/remote"
      >
        Controlls
      </nuxt-link>
      <nuxt-link
        v-if="!isLoggedIn"
        class="btn text-white py-2 px-4 border border-white rounded nav-btn"
        tag="a"
        to="/login"
      >
        Login
      </nuxt-link>
      <a
        v-else
        class="btn text-white py-2 px-4 border border-white rounded nav-btn"
        @click="logOut"
      >
        Logout
      </a>
    </div>
  </nav>
</template>
<script>
import Cookie from '../assets/js/cookie';

export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.userProfile.isLoggedIn;
    },
  },
  methods: {
    /**
     * log the user out of the app
     */
    logOut () {
      Cookie.deleteCookie();
      this.$store.commit('userProfile/logout');
      //  bugfix
      window.location.href = `http://${process.env.HOST}:${process.env.PORT}/`;
    },
  },
};
</script>
<style>
.nav-bg{
  background: var(--nav--bg-color);
}
/* nav.main-nav{
  height: 70px;
  min-height: 70px;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .25rem;
} */

a.nav-btn{
  text-decoration: none;
  font-size: 14px;
}
a.nav-btn:first-child{
  margin-right: 1rem;
}
@media(max-width: 765px){
  nav.main-nav.loggedin{
  margin-top: 2rem;
}
}

</style>
