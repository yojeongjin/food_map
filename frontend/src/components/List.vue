<template>
  <div class="container">
    <div class="inner">
      <div v-for="boardData in boardDatas" :key="boardData.boardIdx" class="post">
        <RouterLink :to="`/board/${boardData.boardIdx}`">
        <div class="post-list">
          <img :src="boardData.boardUrl" alt="음식 사진" class="bd-photo" />
          <div class="bd-info">
            <div class="bd-title">{{ boardData.boardTitle }}</div>
            <div class="bd-writer">{{ boardData.boardWriter }}</div>
          </div>
        </div>
       </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    this.$store.dispatch('save/getList')
  },
  computed: {
    boardDatas() {
      return this.$store.state.save.boardDatas
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 200px;
    .inner {
      margin-left: 600px;
      display: flex;
      flex-wrap: wrap;
      .post-list {
        width: 250px;
        height: calc(250px * 3 / 2);
        margin: 15px;
        border-radius: 4px;
        background-color: #c8c8c8;
        overflow: hidden;
        position: relative;
        &:hover::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 6px solid #fff9da;
        }
        .bd-photo {
          width: 100%;
          height: 100%;
        }
        .bd-info {
          background-color: rgba(#fff, 0.3);
          width: 100%;
          padding: 14px;
          font-size: 15px;
          text-align: center;
          position: absolute;
          left: 0;
          bottom: 0;
          backdrop-filter: blur(10px);
          .bd-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 5px;
            padding: 3px;
          }
        }
      }
    }
  }
</style>