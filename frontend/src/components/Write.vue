<template>
  <div class="container">
    <div class="inner">
      <form>
        <div class="tbPhoto" @click="isEditor=true">
          {{ msg }}
          <!-- <input type="file" accept="image/*" ref="image" @change="onChangeFiles" class="tbPhoto-input" />
          <img v-if="boardUrl" :src="boardUrl" class="tbPhoto-preview" /> -->
        </div>
        <ImgEditor v-if="isEditor" @close="isEditor=false" class="imgEditor" />
        <div class="tbWrite">
          <div class="content"> TITLE
            <input v-model="boardTitle" />
          </div>
          <div class="content"> WRITER
            <span>{{ this.boardWriter }}</span>
          </div>
          <div class="content"> LOCATION
            <input v-model="boardLocation" />
          </div>
          <div style="border:none;" class="content"> CONTENT
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
import ImgEditor from './ImgEditor.vue'

export default {
  components: { ImgEditor },
  data() {
    return {
      boardUrl: null,
      boardTitle: '',
      boardWriter: '',
      boardLocation: '',
      boardContent: '',
      msg: '📸 사진을 업로드 해주세요.',
      isEditor: false
    }
  },
  mounted() {
    const jwt = localStorage.getItem('x-access-token')

    axios.get('https://www.searcheat.shop/api/signin', {
      headers: { 'x-access-token': jwt }
    })
    .then((res) => {
      if(res.data.code === 200) {
        this.boardWriter = res.data.result.nickname
      } else {
        return
      }
    })
  },
  methods: {
    onChangeFiles(e) {
      const file = e.target.files[0]
      this.boardUrl = URL.createObjectURL(file)
      this.msg= ''
    },

    regPost() {

      let form = new FormData()
      let image = this.$refs['image'].files[0]

      const jwt = localStorage.getItem('x-access-token')

      form.append('image', image)
      form.append('boardTitle',this.boardTitle)
      form.append('boardWriter', this.boardWriter)
      form.append('boardLocation', this.boardLocation)
      form.append('boardContent', this.boardContent)

      if(!jwt) {
        alert("로그인 해주세요");
				return;
      }

      if(!this.boardTitle) { 
				alert("제목을 입력해 주세요");
				return;
			}

      if(!this.boardWriter) { 
				alert("작성자를 입력해 주세요");
				return;
			}
      
      if(!this.boardLocation) { 
				alert("위치를 입력해 주세요");
				return;
			}

      if(!this.boardContent) { 
				alert("내용을 입력해 주세요");
				return;
			}

      axios.post('https://www.searcheat.shop/api/board', form, {
        header: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if(res.data.success) {
					alert('등록되었습니다.')
          window.location.reload()
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요")
				}
        console.log(res)
      }) .catch (err => console.log(err))
    }
  }
}
</script>


<style lang="scss" scoped>
  .container {
    margin: 150px 0;
    .inner {
      width: 500px;
      height: 900px;
      padding: 20px 20px;
      form {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        .imgEditor {
            margin: 0 0;
          }
        .tbPhoto {
          position: relative;
          border: 1px dashed #c8c8c8;
          margin: 5px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .tbPhoto-input {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
          }
          .tbPhoto-preview {
            width: 100%;
            height: 100%;
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
            span {
              margin-left: 15px;
              color: #555;
              font-size: 13px;
              font-weight: 400;
            }
          }
          .textarea {
            margin: -45px 0 20px 120px;
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
        margin-top: 15px;
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