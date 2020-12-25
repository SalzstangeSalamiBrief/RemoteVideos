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
        class="btn text-white py-1 px-2 border border-white rounded mr-4"
        tag="a"
        to="/remote"
      >
        Controlls
      </nuxt-link>
      <nuxt-link
        v-if="!isLoggedIn"
        class="btn text-white py-1 px-2 border border-white rounded"
        tag="a"
        to="/login"
      >
        Login
      </nuxt-link>
      <a
        v-else
        class="btn text-white py-1 px-2 border border-white rounded"
        @click="logOut"
      >
        Logout
      </a>
    </div>
  </nav>
</template>
<script>
import JWTStorage from '../assets/js/JWTStorage';

export default {
  name: 'Navigation',
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
      this.$store.commit('userProfile/logout');
      JWTStorage.clearStorage();
      //  bugfix
      this.$router.push('/');
      // window.location.href = `http://${process.env.HOST}:${process.env.PORT}/`;
    },
  },
};
</script>
<style>
.nav-bg{
  background: var(--nav--bg-color);
}

@media(max-width: 765px){
  nav.main-nav.loggedin{
  margin-top: 2rem;
}
}

</style>
