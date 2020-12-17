export const state = () => ({
  isLoggedIn: false,
  username: '',
});
export const getters = {};
export const mutations = {
  login (state) {
    if (!state.isLoggedIn) {
      state.isLoggedIn = true;
    }
  },
  logout (state) {
    if (state.isLoggedIn) {
      state.isLoggedIn = false;
    }
  },
  setUsername (state, payload) {
    state.username = payload;
  },
};
export const actions = {};
