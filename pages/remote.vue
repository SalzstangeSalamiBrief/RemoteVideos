<template>
  <div>
    <div class="center-item--horizontal svg-btn-container">
      <button
        class="btn svg-btn control text-white py-2 px-4 border border-white rounded"
        @click="sendKeyEvent('f')">
        <icon-fullscreen class="svg-white"/>
      </button>
      <button
        class="btn svg-btn control text-white py-2 px-4 border border-white rounded"
        @click="sendKeyEvent('shift-n')">
        <fa
          icon="forward"
          class="fa-1x"/>
      </button>
    </div>
    <div class="center-item--horizontal svg-btn-container">
      <button
        class="btn btn--pause-play center-item--vertical"
        @click="sendKeyEvent('k')">
        <fa
          v-if="!isPaused"
          icon="pause"
          class="fa-4x"/>
        <fa
          v-if="isPaused"
          icon="play"
          class="fa-4x"/>
      </button>
    </div>
    <div class="center-item--horizontal svg-btn-container">
      <!-- <button
        class="btn svg-btn control text-white py-2 px-4 border border-white rounded"
        @click="sendKeyEvent('tab')">
        <icon-tab class="svg-white"/>
      </button>
      <button
        class="btn svg-btn control text-white py-2 px-4 border border-white rounded"
        @click="sendKeyEvent('enter')">
        <icon-enter class="svg-white"/>
      </button> -->
    </div>
    <div class="center-item--horizontal svg-btn-container">
      <button
        class="btn svg-btn control text-white py-2 px-4 border border-white rounded"
        @click="sendKeyEvent('0')">
        <fa
          icon="step-backward"
          class="fa-1x"
        />
      </button>
      <button
        v-if="!isMuted"
        class="btn control text-white py-2 px-4 border border-white rounded svg-btn"
        @click="sendKeyEvent('m')">
        <fa
          icon="volume-mute"
          class="fa-1x"/>
      </button>
      <button
        v-else
        class="btn control text-white py-2 px-4 border border-white rounded svg-btn"
        @click="sendKeyEvent('m')">
        <fa
          icon="volume-up"
          class="fa-1x"/>
      </button>
      <!-- button for netflix player -->
      <!-- <button
        class="btn control text-white py-2 px-4 border border-white rounded svg-btn"
        @click="sendKeyEvent('s')">
        Skip Intro
      </button> -->
    </div>
  </div>
</template>
<script>
import IconEnter from '../static/iconEnter.svg';
import IconFullscreen from '../static/iconFullscreen.svg';
import IconTab from '../static/iconTab.svg';

// import Login from '../helpers/login';
import KeyHandler from '../helpers/key';

export default {
  middleware: 'auth',
  components: {
    IconEnter,
    IconTab,
    IconFullscreen,
  },
  data () {
    return {
      isPaused: true,
      isMuted: false,
    };
  },
  methods: {
    sendKeyEvent (key) {
      if (['space', 'k'].includes(key)) this.isPaused = !this.isPaused;
      if (key === 'm') this.isMuted = !this.isMuted;
      KeyHandler.sendKey(key, this.$store.state.userProfile.username);
    },
  },
};
</script>

<style>
.btn--pause-play{
  border-radius:50%;
  border: 1px solid var(--white-color);
  background: transparent;
  width: 10rem;
  height: 10rem;
  color: var(--white-color);
}
.btn.control{
  min-width: 125px;
  padding: 1.25rem 2.5rem;
}
.svg-white *{
  stroke: rgb(255,255,255);
}
.svg-btn{
  height: 60px;
  margin: 0 1rem;
}
.svg-btn-container{
  margin: 1.5rem 0;
}
</style>
