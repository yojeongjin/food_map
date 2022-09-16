<template>
  <div class="search">
    <img src="../assets/pin.png" alt="핀" />
    <RouterLink to="/" class="search-map">지도에서 맛집찾기</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .search {
    width: 800px;
    height:80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5px 70px;
    margin-right: 10px;
    border-radius: 35px;
    border: 1px solid #FF6333;
    box-sizing: border-box;
    outline: none;
    img {
      width: 42px;
      height: 45px;
      margin: 0 14px 8px 0;
    }
     .search-map{
      color: #FF6333;
      font-size: 44px;
      font-weight: 300;
    }
  }
 
</style>