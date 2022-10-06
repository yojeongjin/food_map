<template>
  <div class="container">
    <div class="inner">
      <div class="sign">
        <div class="sign-input" style="margin-bottom: 8px;">
        <img src="../assets/user.png" alt="아이디" class="icon"/>
        <input type="text" placeholder="아이디를 입력해주세요."/>
        </div>
        <div class="sign-input">
          <img src="../assets/padlock.png" alt="비밀번호" class="icon"/>
          <input type="password" placeholder="비밀번호를 입력해주세요."/>
        </div>
        <div class="sign-auto">
          <div class="checkbox">
            <div class="checkbox-area" :class="{ 'active': active }" @click="getAuto">
              <img :src="active? activeImg : normalImg" alt="체크박스" />
            </div>
            자동 로그인
          </div>
        </div>
        <div class="sign-in">접속하기</div>
        <RouterLink to="/join">회원가입</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      activeImg: require('../assets/check-active.png'),
      normalImg: require('../assets/check.png')
    }
  },
  methods: {
    getAuto() {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 80%;
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
      .sign {
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
                border: 1px solid #fff;
              }
            }
          }
        }
        .sign-in {
          display: flex;
          color: #fff;
          background-color: #ff6333;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          width: 60%;
          height: 10%;
          margin-bottom: 16px;
          cursor: pointer;
          padding: 0 13px;
        }
      }
    }
  }
</style>