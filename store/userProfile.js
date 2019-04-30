export const state = () => ({
  isLoggedIn: false,
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
};
export const actions = {};
