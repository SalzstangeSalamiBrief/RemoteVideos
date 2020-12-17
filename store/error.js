export const state = () => ({
  isActive: false,
  errorMsg: '',
});
export const getters = {};
export const mutations = {
  showError (state, message) {
    state.errorMsg = message;
    state.isActive = true;
  },
  clearError (state) {
    state.isActive = false;
    state.errorMsg = '';
  },
};
export const actions = {
  showError ({ commit }, errorMsg) {
    commit('showError', errorMsg);
    setTimeout(() => {
      commit('clearError');
    }, 2000);
  },
};
