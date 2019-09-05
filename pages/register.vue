<template>
  <div class="w-full max-w-xs login-container">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 class="center-item--vertical text-grey-darker mb-5">Register</h1>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username">
          Username
        </label>
        <input
          id="username"
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username">
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************">
          <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="registerUser"
        >
          Register
        </button>
      </div>
    </form>
</div></template>
<script>
import Register from '../helpers/register';

export default {
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
    async registerUser () {
      console.log(')(');
      try {
        const resp = await Register.registerUser(this.username, this.password);
        if (resp.status === 200) {
          this.$router.push('/login');
          return;
        }
        this.$store.dispatch('error/showError', 'Invalid credentials. Please try something other.');
      } catch (error) {
        this.$store.dispatch('error/showError', 'Somethign went wrong. Please try again.');
      }
    },
  },
};
</script>
<style>
.login-container{
  margin: calc(25vh - 100px) auto 0 auto;
}
</style>
