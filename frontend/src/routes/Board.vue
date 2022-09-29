<template>
  <List />
  <Write class="write" />
</template>

<script>
import List from "../components/List.vue";
import Write from "../components/Write.vue";
export default {
    components: { List, Write }
}
</script>

<style lang="scss" scoped>
  #app {
    position: relative;
    .write {
      position: absolute;
      top: 200px;
    }
  }
</style>