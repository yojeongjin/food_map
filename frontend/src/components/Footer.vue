<template>
  <footer>
    <RouterLink to="/">
      (c) {{ new Date().getFullYear() }} 맛있을 지도
    </RouterLink>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  margin-top: 50px;
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
}
</style>