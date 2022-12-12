<template>
  <footer>
    <RouterLink to="/">
      (c) {{ new Date().getFullYear() }} 맛있을 지도
      <div class="footer-content">
        <h4>GitHub</h4>
        <h4>Blog</h4>
      </div>
    </RouterLink>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  background-color: #fefdf8;
  border-top: 1px solid #aaa;
  font-size: 14px;
  color: #bbb;
  padding: 70px 0 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .footer-content {
    display: flex;
    margin-top: 10px;
    font-size: 11px;
    color: #555;
    justify-content: space-evenly;
  }
}
</style>