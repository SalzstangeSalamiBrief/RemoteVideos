export const state = () => ({
  mode: 'default',
  keys: {
    default: {
      next: 'shift-n',
      mute: 'm',
      fullscreen: 'f',
      play: 'k',
      tab: 'tab',
      enter: 'enter',
      skipTenSecs: '',
    },
    wakanim: {
      next: '',
      mute: '',
      fullscreen: '',
      play: '',
      tab: '',
      enter: '',
      skipTenSecs: '',
    },
  },
});

export const mutations = {
  setMode(state, payload) {
    if (Object.keys(state.keys).includes(payload)) state.mode = payload;
  },
};
