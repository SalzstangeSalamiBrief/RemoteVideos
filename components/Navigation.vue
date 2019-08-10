<template>
  <nav
    :class="{'loggedin': isLoggedIn}"
    class="flex nav-bg center-item--horizontal main-nav">
    <nuxt-link
      class="nav__brand text-xl font-semibold tracking-tight"
      tag="div"
      to="/">RemoteVideos</nuxt-link>
    <!-- <div class="nav__brand text-xl font-semibold tracking-tight" @click="">RemoteVideos</div> -->
    <div class="nav__space"/>
    <div class="nav__login-out center-item--horizontal">
      <nuxt-link
        v-if="isLoggedIn"
        class="inline-block text-sm px-4 py-2 mr-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white  lg:mt-0"
        tag="a"
        to="/remote">
        Controlls
      </nuxt-link>
      <nuxt-link
        v-if="!isLoggedIn"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white  lg:mt-0"
        tag="a"
        to="/login">
        Login
      </nuxt-link>
      <a
        v-else
        class="inline-block text-sm px-4 py-2 mr-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white  lg:mt-0"
        @click="logOut">
        Logout
      </a>
    </div>
  </nav>
</template>
<script>
import Cookie from '../helpers/cookie';

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
      this.$router.push('/');
    },
  },
};
</script>
<style>
.nav-bg{
  background: var(--nav--bg-color);
}
.nav__space{
  width: calc(100vw - 320px);
}
  .nav__brand{
  width: 200px
}
.nav__login-out{
  /* width: 120px; */
}
 .nav__brand{
  padding-left: 1rem;
}
nav.main-nav{
  height: 70px;
  width: 100vw;
}
@media(max-width: 765px){
  nav.main-nav.loggedin{
  height: 70px;
  padding: 1rem;
  margin-top: 1.5rem;
}
}
</style>
