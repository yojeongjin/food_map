<template>
  <div class="container">
    <div class="inner">
      <div class="sign">
        <div class="sign-input" style="margin-bottom: 8px;">
        <img src="../assets/user.png" alt="아이디" class="icon"/>
        <input v-model='userId' type="text" placeholder="아이디를 입력해주세요."/>
        </div>
        <div class="sign-input">
          <img src="../assets/padlock.png" alt="비밀번호" class="icon"/>
          <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요." @keyup.enter="getSignIn" />
        </div>
        <div class="sign-auto">
          <div class="checkbox">
            <div class="checkbox-area" :class="{ 'active': active }" @click="getAuto">
              <img :src="active? activeImg : normalImg" alt="체크박스" />
            </div>
            자동 로그인
          </div>
        </div>
        <button class="sign-in" @click="getSignIn">접속하기</button>
        <RouterLink to="/join">회원가입</RouterLink>
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
      active: false,
      activeImg: require('../assets/check-active.png'),
      normalImg: require('../assets/check.png')
    }
  },
  methods: {
    getAuto() {
      this.active = !this.active
    },
    getSignIn() {
      axios.post('http://localhost:3000/api/signin', {
        userId: this.userId,
        password: this.password
      })
      .then((res) => {
        
        if(res.data.success) {
          if(this.active === true) {
            const jwt = res.data.result.jwt;
            localStorage.setItem('x-access-token', jwt)
          } else {
            const jwt = res.data.result.jwt;
            localStorage.removeItem('x-access-token', jwt)
          }
          alert(res.data.msg)
          window.location.replace('/')

        } else {
          alert(res.data.msg)
        }
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
      position: absolute;
      left: 0;
      width: 50%;
      height: 700px;
    }
    .inner {
      width: 80%;
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
      .sign {
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 70%;
        .sign-input {
        width: 60%;
        height: 10%;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        display: flex;
        align-items: center;
        overflow: hidden;
        input {
          border: none;
          color: #222;
          box-sizing: border-box;
          font-size: 14px;
          padding-left: 10px;
          width: 100%;
          height: 48px;
        }
        .icon{
          margin-left: 8px;
        }
        }
        .sign-auto {
          justify-content: flex-end;
          display: flex;
          width: 60%;
          height: 10%;
          margin-bottom: 40px;
          .checkbox {
            display: flex;
            align-items: center;
            font-size: 14px;
            .checkbox-area {
              border: 1px solid #ccc;
              border-radius: 4px;
              background-color: #fff;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 8px;
              &.active {
                background-color: #ff6333;
                border: none;
              }
            }
          }
        }
        .sign-in {
          border: none;
          font-size: 17px;
          display: flex;
          color: #fff;
          background-color: #ff6333;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          width: 60%;
          height: 10%;
          margin-bottom: 16px;
          padding: 0 13px;
        }
      }
    }
  }
</style>