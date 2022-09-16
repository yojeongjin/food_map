<template>
  <header>
    <div class="inner">
      <!-- <Logo /> -->
      <div class="nav">
        <div v-for="nav in navigations" :key="nav.name" class="nav-item">
          <RouterLink :to="nav.href" class="nav-link">
            {{nav.name}}
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

// import Logo from './Logo.vue';
export default {
    data() {
        return {
            navigations: [
                {
                    name: "맛집 가이드",
                    href: "/"
                },
                {
                    name: "지역별 대표음식",
                    href: "/"
                },
                {
                    name: "오늘 뭐먹지?",
                    href: "/"
                }
            ]
        };
    },
    // components: { Logo }
}
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
      right: 0px;
      bottom: 8px;
      display: flex;
      .nav-item {
        font-size: 20px;
        font-weight: 500;
        padding: 10px 50px;
        display: block;
        color: #605f5f;
        &:hover {
          color: #000;
        }
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