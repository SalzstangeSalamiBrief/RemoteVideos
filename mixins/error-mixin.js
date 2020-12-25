export default {
  methods: {
    /**
     * display a passed msg as error for a failed login
     */
    displayError (msg) {
      if (msg) {
        this.$store.dispatch('error/showError', msg);
      }
    },
  },
};
