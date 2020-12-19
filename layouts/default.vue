<template>
  <div class="center-item--vertical full-screen">
    <navigation />
    <error />

    <main class="full-screen">
      <nuxt class="relative pin" />
    </main>
  </div>
</template>
<script>
import Navigation from '../components/Navigation.vue';
import Error from '../components/Error.vue';

export default {
  components: {
    Navigation,
    Error,
  },
  middleware: 'auth',
};
</script>

<style>
</style>
