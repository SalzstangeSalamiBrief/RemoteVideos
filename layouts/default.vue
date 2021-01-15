<template>
  <div class="center-item--vertical full-screen">
    <navigation />
    <error />

    <main class="full-screen px-2">
      <nuxt class="relative pin" />
    </main>
  </div>
</template>
<script>
import Navigation from '../components/Navigation.vue';
import Error from '../components/Error.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Navigation,
    Error,
  },
  middleware: 'auth',
};
</script>

<style>
</style>
