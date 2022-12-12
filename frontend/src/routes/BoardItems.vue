<template>
  <div v-if="nonModify" class="items">
      <div v-for="boardData in boardDatas" :key="boardData.boardIdx" class="items-inner">
        <div class="items-photo">
          <img :src="boardData.boardUrl" alt="대표사진" class="img"/>
        </div>
        <div class="items-info">
          <div class="items-title">{{ boardData.boardTitle }}</div>
          <div class="items-about">
            <h3>WRITER 💌</h3>
             {{ boardData.boardWriter }}
          </div>
          <div class="items-about">
            <h3>LOCATION 💌</h3>
             {{ boardData.boardLocation }}
          </div>
          <div class="items-content">
            <h3>CONTENT 💌</h3>
          </div>
          <div class="items-story">
            {{ boardData.boardContent }}
          </div>
        </div>

        <div class="buttons">
          <button @click=getModify>수정</button>
          <button @click=getDelete>삭제</button>
          <RouterLink to="/board"><button>목록</button></RouterLink>
        </div>
      </div>
    </div>

    <div v-else class="items">
      <div v-for="boardData in boardDatas" :key="boardData.boardIdx" class="items-inner">
        <div class="items-photo">
          <img :src="boardData.boardUrl" alt="대표사진" class="img"/>
        </div>
        <div class="items-info">
          <div class="items-title">
            <input class="input-title" v-model="modifyDatas.modifyTitle" />
          </div>
          <div class="items-about">
            <h3>WRITER 💌</h3>
             {{ boardData.boardWriter }}
          </div>
          <div class="items-about">
            <h3>LOCATION</h3>
            💌 <input class="input-about" v-model="modifyDatas.modifyLocation" />
          </div>
          <div class="items-content">
            <h3>CONTENT 💌</h3>
          </div>
          <div class="input-story">
            <textarea v-model="modifyDatas.modifyContent" />
          </div>
        </div>

        <div class="buttons">
          <button class="save-btn" @click="getUpdate">저장하기</button>
        </div>
      </div>
    </div>




</template>

<script>
  import axios from 'axios'

export default {
  data() {
    return {
      boardDatas: [],
      nonModify: true,
      nickname: ''
    }
  },
  mounted() {
    this.getPost()
    this.getNickname()
  },
  computed: {
    modifyDatas(){
      return {
        modifyIdx: this.boardDatas[0].boardIdx,
        modifyTitle: this.boardDatas[0].boardTitle,
        modifyWriter: this.boardDatas[0].boardWriter,
        modifyLocation: this.boardDatas[0].boardLocation,
        modifyContent: this.boardDatas[0].boardContent,
      }
    }
  },
  methods: {
    getPost() {
      axios.get('https://www.searcheat.shop/api/board/'+this.$route.params.items, {params: {
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
    getNickname() {
      const jwt = localStorage.getItem('x-access-token')

      axios.get('https://www.searcheat.shop/api/signin', {
        headers: { 'x-access-token': jwt }
      })
      .then((res) => {
        if(res.data.code === 200) {
          this.nickname = res.data.result.nickname
        } else {
          return
        }
      })
    },
    getModify() {
      if(this.nickname === this.boardDatas[0].boardWriter) {
        this.nonModify = false
      } else {
        alert('본인이 작성한 글만 수정 할 수 있어요!')
      }
    },
    getDelete() {
      //다시 구현
      if(this.nickname === this.boardDatas[0].boardWriter) {
        axios.delete('https://www.searcheat.shop/api/board', {params: {
          boardIdx: this.$route.params.items,
        }})
        .then((res) => {
          alert(res.data.msg)
          window.location.replace('/')
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        alert('본인이 작성한 글만 삭제 할 수 있어요!')
      }
    },
    getUpdate() {
      axios.patch('https://www.searcheat.shop/api/board', {
        boardIdx: this.boardDatas[0].boardIdx,
        boardTitle: this.modifyDatas.modifyTitle,
        boardLocation: this.modifyDatas.modifyLocation,
        boardContent: this.modifyDatas.modifyContent
      }).then((res) => {
        if(res.data.success) {
					alert('수정되었습니다.')
          window.location.reload()
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요")
				}
        console.log(res)
      }) .catch (err => console.log(err))

      console.log(this.boardDatas[0].boardIdx)
    }
  }
}
</script>

<style lang="scss" scoped>
 .items {
  margin-top: 120px;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .items-inner {
    width: 75%;
    height: 95%;
    display: flex;
    .items-photo {
      border-radius: 15px;
      box-sizing: border-box;
      flex-shrink: 0;
      width: 45%;
      height: 80%;
      margin: 25px 40px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .items-info {
      width: 55%;
      height: 100%;
      flex-grow: 1;
      margin-top: 20px;
      .items-title {
        width: 90%;
        padding-top: 5px;
        font-size: 50px;
        font-weight: 500;
        margin: 5px 0 30px 0;
        white-space: wrap;
      }
      .items-about {
        width: 90%;
        padding-top: 5px;
        margin-bottom: 10px;
        display: flex;
        line-height: 1.4;
        border-bottom: 1px solid #eee;
      }
      .items-content {
        width: 90%;
        padding-top: 5px;
        margin-bottom: 10px;
      }
      .items-story {
        width: 90%;
        margin: 0 0 15px 0;
        line-height: 1.4;
        margin-left: 10px;
      }
      h3 {
        margin:0 6px 0 6px;
        font-size: 20px;
        font-weight: 500;
      }
      .input-title {
        width: 90%;
        padding-top: 5px;
        font-size: 50px;
        font-weight: 500;
        box-sizing: border-box;
      }
      .input-story {
        width: 100%;
        height: 90%;
        textarea {
          box-sizing: border-box;
          width: 100%;
          height: 56%;
        }
      }
    }
  }
  .buttons {
    position: absolute;
    bottom: 50px;
    width: 70%;
    height: 10%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      margin-right: 15px;
      padding: 5px 15px;
      cursor: pointer;
      background-color: transparent;
      border:none;
      color: #555555;
      font-size: 14px;
      &:hover {
        scale: 1.1;
        color: black;
      }
    }
    .save-btn {
      border: 1px solid #555555;
      border-radius: 8px;
      padding: 10px 15px;
    }
  }
}

</style>