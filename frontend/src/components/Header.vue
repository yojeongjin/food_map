<template>
  <header>
    <div class="inner">
      <Logo class="logo" />
      <div class="nav">
        <div class="nav-item">
          <RouterLink to="/board" class="nav-link">
            맛집 가이드
          </RouterLink>
        </div>
      </div>
      <div class="nav-sign">
        <div class="nav-item">
          <RouterLink to="/signin" class="nav-link">
            로그인
          </RouterLink>
          <RouterLink to="/join" class="nav-link">
            회원가입
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>


import Logo from './Logo.vue';
export default {
    components: { Logo }
}
</script>


<style lang="scss" scoped>
  
  header {
    background-color: #fefdf8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .inner {
      width: 80%;
      height: 100%;
      position: relative;
      .logo {
      position: absolute;
      top: -30px;
      left: 40%;
      }
    }
    .nav {
      position: absolute;
      left: 10%;
      bottom: 0;
    }
    .nav-sign {
      position: absolute;
      right: 10%;
      bottom: 0;
      display: flex;
    }
    .nav-item {
      font-size: 20px;
      font-weight: 500;
      padding: 10px 50px;
      display: flex;
      color: #2e7e3e;
    }
    .nav-link {
      margin-right: 15px;
    }
  }

</style>