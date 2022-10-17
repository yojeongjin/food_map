<template>
  <header>
    <div class="inner">
      <Logo class="logo" />
      <div class="nav-sign">
        <div v-if=isNickname class="non-nickname">
          <RouterLink to="/signin" class="nav-link">
            로그인
          </RouterLink>
          <RouterLink to="/join" class="nav-link">
            회원가입
          </RouterLink>
        </div>
        <did v-else class="nickname">
          <did class="nickname-words">
            안녕하세요, {{this.nickname}} 님!
          </did>
          <div @click="getSignOut" class="logout">
            로그아웃
          </div>
        </did>
      </div>
      <div class="nav-menu">
        <RouterLink to="/board" class="nav-item">
          맛집 가이드
        </RouterLink>
        <RouterLink to="/find" class="nav-item">
          지도 보기
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>

import axios from 'axios';

import Logo from './Logo.vue';
export default {
    components: { Logo },

  data() {
    return {
      nickname: '',
      isNickname: true
    }
  },
  mounted() {
    const jwt = localStorage.getItem('x-access-token')

    axios.get('http://15.164.56.29:3000/api/signin', {
      headers: { 'x-access-token': jwt }
    })
    .then((res) => {
      if(res.data.code === 200) {
        this.nickname = res.data.result.nickname
        this.isNickname = false
      } else {
        return
      }
    })
  },
  methods: {
    getSignOut() {
      if(this.active === true) {
        this.isNickname = false
        window.location.replace('/')
      } else {
        localStorage.removeItem('x-access-token', this.jwt)
        window.location.replace('/')
      }
    }
  }
}
</script>


<style lang="scss" scoped>  
  header {
    background-color: #fefdf8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .inner {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .logo {
        position: absolute;
        left: 42%;
      }
      .nav-sign {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        .non-nickname {
          display: flex;
          .nav-link {
            font-size: 12px;
            padding: 11px 16px;
            display: block;
            color: #656565;
            &:hover {
              color: black;
            }
          }
        }
        .nickname {
          padding: 11px 16px 0 16px;
          font-size: 12px;
          display: block;
          color: #656565;
          display: flex;
          .nickname-words {
            margin-right: 5px;
          }
          .nickname-word {
            border-bottom: 1px solid black;
            cursor: pointer;
          }
          .logout {
            margin-left: 65px;
            font-size: 12px;
            display: block;
            color: #656565;
            cursor: pointer;
            &:hover {
              color: black;
            }
          }
        }
      }
      .nav-menu {
        position: absolute;
        bottom: 0;
        right: 120px;
        display: flex;
        .nav-item {
          padding: 10px 20px 14px 20px;
          color: #333;
          font-size: 13px;
          &:hover {
            color: black;
          }
        }
      }
    }
  }

</style>