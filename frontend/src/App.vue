<template>
  <Header />
  <RouterView />
  <Footer class="footer"/>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
    components: { Header, Footer }
}
</script>

<style lang="scss">
  @import url('https://webfontworld.github.io/SCoreDream/SCoreDream.css');
  #app {
    font-family: 'SCoreDream';
    font-style: normal;
    font-display: swap;
  }
</style>