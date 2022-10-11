<template>
  <div class="modal">
      <div v-for="boardData in boardDatas" :key="boardData.boardIdx" class="modal-inner">
        <div class="modal-photo">
          <img :src="boardData.boardUrl" alt="대표사진" class="img"/>
        </div>
        <div class="modal-info">
          <div class="modal-title">{{ boardData.boardTitle }}</div>
          <div class="modal-about">
            <h3>WRITER </h3>
            💌 {{ boardData.boardWriter }}
          </div>
          <div class="modal-about">
            <h3>LOCATION</h3>
            💌 {{ boardData.boardLocation }}
          </div>
          <div class="modal-content">
            <h3>CONTENT 💌</h3>
          </div>
          <div class="modal-story">
            {{ boardData.boardContent }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

export default {
  mounted() {
    axios.get('http://localhost:3000/api/board/'+this.$route.params.items, {params: {
      items: this.$route.params.items
    }})
    .then((res) => {
      console.log(res)
      this.boardDatas = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  data() {
    return {
      boardDatas: []
    }
  }
}
</script>

<style lang="scss" scoped>
 .modal {
  margin-top: 100px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .modal-inner {
    width: 75%;
    height: 95%;
    display: flex;
    .modal-photo {
      border-radius: 15px;
      box-sizing: border-box;
      flex-shrink: 0;
      width: 45%;
      height: 90%;
      margin: 25px 40px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .modal-info {
      width: 55%;
      height: 100%;
      flex-grow: 1;
      margin-top: 20px;
      border-bottom: 1px solid #eee;
      .modal-title {
        width: 90%;
        padding-top: 5px;
        font-size: 50px;
        font-weight: 500;
        margin: 5px 0 30px 0;
        white-space: wrap;
      }
      .modal-about {
        width: 90%;
        padding-top: 5px;
        margin-bottom: 10px;
        display: flex;
        line-height: 1.4;
        border-bottom: 1px solid #eee;
      }
      .modal-content {
        width: 90%;
        padding-top: 5px;
        margin-bottom: 10px;

      }
      .modal-story {
        width: 90%;
        margin: 0 0 15px 0;
        line-height: 1.4;
      }
      h3 {
        margin:0 6px 0 6px;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>