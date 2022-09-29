<template>
  <div class="container">
    <div class="inner">
      <form>
        <div class="tbPhoto">
          📸 사진을 업로드 해주세요.
          <input type="file" accept="image/*" class="tbPhoto-input" />
        </div>
        <div class="tbWrite">
          <div class="content"> TITLE
            <input v-model="boardTitle" />
          </div>
          <div class="content"> WRITER
            <input v-model="boardWriter" />
          </div>
          <div class="content"> LOCATION
            <input v-model="boardLocation" />
          </div>
          <div class="content"> CONTENT
          </div>
          <textarea v-model="boardContent" class="textarea"></textarea>
        </div>

      </form>
      <button @click="regPost" class="btn">저장하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      boardPhoto: '',
      boardTitle: '',
      boardWriter: '',
      boardLocation: '',
      boardContent: '',
    }
  },
  methods: {
    regPost() {
      this.form = { 
        boardPhoto: this.boardPhoto,
        boardTitle: this.boardTitle,
        boardWriter: this.boardWriter,
        boardLocation: this.boardLocation,
        boardContent: this.boardContent,
			}
      axios.post('http://localhost:3000/api/board',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					window.onload()
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
    }
  }
}
</script>


<style lang="scss" scoped>
  .container {
    width: 500px;
    height: 90%;
    .inner {
      padding: 20px 20px;
      form {
        border-top: 2px solid black;
        .tbPhoto {
          border: 1px dashed #c8c8c8;
          margin: 5px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          >.tbPhoto-input {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
          }
        }
        .tbWrite {
          position: relative;
          .content {
            padding: 5px;
            margin: 15px;
            height: 50%;
            justify-content: space-between;
            border-bottom: 1px solid #c8c8c8;
            input {
              width: 300px;
              height: 30px;
              border: none;
              margin-left: 20px;
            }
          }
          .textarea {
            margin: 0 0 20px 120px;
            width: 300px;
            height: 250px;
            resize: none;
            border: none;
          }
        }
      }
      .btn {
        position: absolute;
        right: 20px;
        padding: 15px 25px;
        border: 1px solid #c8c8c8;
        border-radius: 15px;
        background-color: transparent;
        font-size: 17px;
        cursor: pointer;
      }
    }
  }
</style>