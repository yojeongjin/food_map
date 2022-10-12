<template>
  <div class="spinner">
    <FadeLoader class="spinner=icon" />
  </div>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default {
  components: { FadeLoader }
}
</script>

<style lang="scss" scoped>
  .spinner {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: progress;
    z-index: 777;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>