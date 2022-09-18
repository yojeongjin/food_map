<template>
  <div class="main">
    <div class="inner">
      <Search />
      <!-- <img src="../assets/도토리.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
export default {
    components: { Search }
}
</script>

<style lang="scss" scoped>
  .main {
    margin-top: 160px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(253, 230, 188);
    .inner {
      width: 1200px;
      height: 670px;
      display: flex;
      position: relative;
      .search {
        position: absolute;
        top: 280px;
        left: 180px;
      }
    }
  }
</style>