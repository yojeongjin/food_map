<template>
  <div class="container">
    <div class="inner">
      <div class="join">
        <div class="join-input">
          <span style="margin-right:50px;">아이디</span>
          <div class="input-box">
            <input v-model="userId" type="text" placeholder="6~20자의 영문자+숫자만 사용 가능합니다."/>
          </div>
          <div class="check">
            <div class="checkbox" @click="checkId">
              <div class="checkbox-area">
                <img :src="active? activeImg : normalImg" alt="체크박스" />
              </div>
              아이디 중복확인
            </div>
          </div>
        </div>
        <div class="join-input">
          <span style="margin-right:37px;">비밀번호</span>
          <div class="input-box">
            <input v-model="password" type="password" placeholder="8~16자 영문자+숫자만 사용가능합니다."/>
          </div>
          <div class="check">
          </div>
        </div>
        <div class="join-input">
          비밀번호 확인
          <div class="input-box">
            <input v-model="repassword" type="password" placeholder="8~16자 영문자+숫자만 사용가능합니다."/>
          </div>
          <div class="check"></div>
        </div>
        <div class="join-input">
          <span style="margin-right:50px;">닉네임</span>
          <div class="input-box">
            <input v-model="nickname" type="text" placeholder="두 글자 이상 입력해 주세요."/>
          </div>
          <div class="check"></div>
        </div>
        <button class="join-button" @click="join">가입하기</button>
        <RouterLink to="/">돌아가기</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        userId: '',
        password: '',
        repassword: '',
        nickname: '',
        active: false,
        activeImg: require('../assets/idcheck.png'),
        normalImg: require('../assets/check.png')
      }
    },
    methods: {
      checkId() {
        if(!this.userId) { 
          alert('아이디를 입력해 주세요.')
          return
        }
        axios.get('https://www.searcheat.shop/api/join', {params: {userId: this.userId }})
        .then((res) => {
          if(res.data.success) {
            alert('사용 가능한 아이디입니다.')
            this.active = !this.active
          } else {
            alert('이미 사용 중인 아이디입니다.')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      },
      join() {
        if(this.active === false) {
          alert('아이디 중복확인을 해주세요')
          return
        }
        axios.post('https://www.searcheat.shop/api/join', {
          userId: this.userId,
          password: this.password,
          repassword: this.repassword,
          nickname: this.nickname
        })
        .then((res) => {
          alert(res.data.msg)

          const jwt = res.data.result.jwt;
          localStorage.setItem('x-access-token', jwt)
          window.location.replace('/')
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before {
      content: '';
      display: block;
      background-image: url('../assets/joinbg.png');
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      width: 100%;
      height: 700px;
    }
    .inner {
      width: 80%;
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
      .join {
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 70%;
        .join-input {
          margin-left: 30px;
          width: 70%;
          height: 10%;
          display: flex;
          align-items: center;
          .input-box {
            flex: 1;
            box-sizing: border-box;
            font-size: 14px;
            width: 40%;
            height: 48px;
            margin-left: 15px;
            input {
              border: none;
              color: #222;
              border-bottom: 1px solid #ccc;
              box-sizing: border-box;
              font-size: 14px;
              padding-left: 10px;
              width: 100%;
              height: 100%;
            }
          }
          .check {
            width: 30%;
            display: flex;
            cursor: pointer;
            .checkbox{
              display: flex;
              align-items: center;
              font-size: 13px;
              color: #333;
              .checkbox-area {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 5px;
              }
            }
          }
        }
        .join-button {
          display: flex;
          color: #fff;
          border: none;
          font-size: 19px;
          background-color: #ff6333;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          width: 60%;
          height: 10%;
          margin: 50px 0 15px 0;
        }
      }
    }
  }
</style>