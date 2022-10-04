<template>
  <div id="find-app">
    <Map />
    <Sidebar class="side-bar" />
  </div>
</template>

<script>
import Map from '@/components/Map.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: { Map, Sidebar }
}
</script>

<style lang="scss" scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .side-bar {
    position: absolute;
    left: 0;
    top: 160px;
    bottom: 0;
    z-index: 1000;
  }
}
</style>