<template>
  <div class="side-container">
    <div v-if="isShow" class="side-bar"></div>
    <button class="close-btn" @click="showSide">
      {{ isShow ? '닫힘' : '열림' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow : true
    }
  },
  methods: {
    showSide() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-container {
    position: relative;
    .side-bar {
      background-color: #fff;
      opacity: 70%;
      width: 500px;
      height: 100%;
    }
    .close-btn{
      position: absolute;
      top: 0px;
      right: -50px;
      width: 50px;
      height: 30px;
      }
  }
</style>