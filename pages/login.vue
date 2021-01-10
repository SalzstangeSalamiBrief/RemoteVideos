<template>
  <div class="w-full max-w-xs login-container text-white main-bg">
    <form
      class="rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 class="flex flex-col text-xl font-bold  justify-center items-center text-grey-darker mb-5">
        Login
      </h1>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          id="username"
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
          type="text"
          placeholder="Username"
        >
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          v-model="password"
          class="bg-white shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        >
      </div>
      <div class="flex items-center justify-between">
        <button
          class="text-white border border-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          to="/login"
          @click.prevent="logUserIn"
        >
          Sign In
        </button>
        <nuxt-link
          tag="a"
          class="inline-block align-baseline font-bold text-sm text-white hover:text-blue-400"
          to="/register"
        >
          Register yourself
        </nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import Login from '../assets/js/login';
import JWTStorage from '../assets/js/JWTStorage';
import ErrorMixin from '../mixins/error-mixin';

export default {
  name: 'Login',
  mixins: [ErrorMixin],
  data () {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    /**
     * function for logging a user in
     * if the response from the server does have an err-key then the login failed. Else the login was successfully and the authtoken and the store get configured
     */
    async logUserIn () {
      try {
        const { error } = await Login.login(this.username, this.password);
        if (error) {
          this.displayError('Invalid credentials. Please try something other.');
          JWTStorage.clearStorage();
        } else {
          this.commitUserLogin();
        }
      } catch (err) {
        this.displayError('Something went wrong. Please try again.');
        JWTStorage.clearStorage();
      }
    },
    /**
     * log the user in through setting corresponsing variables in the store
     * after that redirect to /remote
     *
     */
    commitUserLogin () {
      this.$store.commit('userProfile/login');
      this.$store.commit('userProfile/setUsername', this.username);
      this.$router.push('/remote');
    },
  },
};
</script>
<style>
.login-container{
  margin: calc(25vh - 100px) auto 0 auto;
}
</style>
