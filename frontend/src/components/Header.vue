<template>
  <header>
    <div class="inner">
      <!-- <Logo /> -->
      <div class="nav">
        <div class="nav-item">
          <RouterLink to="/board" class="nav-link">
            맛집 가이드
          </RouterLink>
        </div>
        <div>로그인</div>
        <div>회원가입</div>
      </div>
    </div>
  </header>
</template>

<script>


// import Logo from './Logo.vue';
// export default {
//     components: { Logo }
// }
</script>


<style lang="scss" scoped>
  
  header {
    background-color: #fefdf8;
    position: fixed;
    top: 0;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .inner {
      width: 1200px;
      height: 100%;
      position: relative;
      .logo {
      position: absolute;
      height: 70px;
      top: -11px;
      left: 0px;
      }
    }
    .nav {
      position: absolute;
      right: -100px;
      bottom: 8px;
      display: flex;
      .nav-item {
        font-size: 20px;
        font-weight: 500;
        padding: 10px 50px;
        display: flex;
        color: #605f5f;
        ::before {
          content: "";
          width: 35px;
          height: 35px;
          background: url(../assets/spoon.png);
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: 7px 0 0 -25px; 
        }
      }
    }
  }
</style>