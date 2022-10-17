<template>
  <div class="container">
    <div class="inner">
      <div v-for="paginatedData in paginatedDatas" :key="paginatedData.boardIdx" class="post">
        <RouterLink :to="`/board/${paginatedData.boardIdx}`">
        <div class="post-list">
          <img :src="paginatedData.boardUrl" alt="음식 사진" class="bd-photo" />
          <div class="bd-info">
            <div class="bd-title">{{ paginatedData.boardTitle }}</div>
            <div class="bd-writer">작성자: {{ paginatedData.boardWriter }}</div>
          </div>
        </div>
       </RouterLink>
      </div>
    </div>

    <div class="pagination">
      <button :disabled="pageNum === 0" class="btn-next" @click="prevPage()">
        이전
      </button>
      <span>{{ pageNum + 1 }} / {{ pageCount===0? 1: pageCount }}</span>
      <button :disabled="pageNum >= pageCount - 1" class="btn-next" @click="nextPage()">
        다음
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pageNum: 0,
      pageSize: 6
    }
  },
  mounted() {
    this.$store.dispatch('save/getList')
  },
  computed: {
    boardDatas() {
      return this.$store.state.save.boardDatas
    },
    pageCount() {
      const listLength = this.boardDatas.length;
      const listSize = this.pageSize;
      let page = Math.floor(listLength / listSize);
      if (listLength % listSize > 0) page += 1;

      return page;
    },
    paginatedDatas() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.boardDatas.slice(start, end)
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1
    },
    prevPage() {
      this.pageNum -= 1
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 150px;
    .inner {
      margin-left: 600px;
      height: 800px;
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
          text-align: center;
          position: absolute;
          left: 0;
          bottom: 0;
          backdrop-filter: blur(10px);
          box-sizing: border-box;
          .bd-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 5px;
            padding: 3px;
          }
          .bd-writer {
            font-size: 13px;
          }
        }
      }
    }
    .pagination {
      margin: 20px 0 0 800px;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn-next {
        padding: 5px 10px;
        margin: 0 7px 0 7px;
        border: none;
      }
      span {
        font-size: 13px;
      }
    }
  }
</style>