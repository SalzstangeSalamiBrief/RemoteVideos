<template>
  <div class="w-full max-w-xs login-container  main-bg">
    <form
      class="rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 class="flex flex-col text-xl font-bold justify-center items-center text-grey-darker mb-5">
        Register
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
          class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
          class="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        >
        <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="text-white border border-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click.prevent="registerUser"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Register from '../assets/js/register';
import ErrorMixin from '../mixins/error-mixin';

export default {
  name: 'Register',
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
    async registerUser () {
      try {
        const status = await Register.registerUser(this.username, this.password);
        const parsedStatusCode = parseInt(status, 10);
        if (parsedStatusCode === 201) {
          return this.$router.push('/login');
        }
        this.displayError('error/showError', 'Invalid credentials. Please try something other.');
      } catch (error) {
        this.displayError('error/showError', 'Somethign went wrong. Please try again.');
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
