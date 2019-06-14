export const state = () => ({
  isActive: false,
  errorMsg: '',
});
export const getters = {};
export const mutations = {
  showError (state, message) {
    state.errorMsg = message;
    state.isActive = true;
    setTimeout(() => {
      state.isActive = false;
      state.errorMsg = '';
    }, 1000);
  },
  clearError (state) {
    state.isActive = false;
    state.errorMsg = '';
  },
};
export const actions = {};
