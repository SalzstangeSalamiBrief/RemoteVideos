<template>
  <div
    v-if="showError"
    class="error  center-item--vertical">{{ errorMSG }}</div>
</template>
<script>
export default {
  computed: {
    errorMSG () {
      return this.$store.state.error.errorMsg;
    },
    showError () {
      return this.$store.state.error.isActive;
    },
  },
};
</script>
<style scoped>
  .error{
  border: 2px solid red;
  border-radius: 5px;
    color: black;
  background: white;
  min-height: 2rem;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  top: 80px;
  padding: 5px;
  z-index: 100;
}
@media(max-width: 756px){
  .error{
    width: 95%;
  }
}
</style>
