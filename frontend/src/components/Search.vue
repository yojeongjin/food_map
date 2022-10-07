<template>
  <div class="search">
    <img src="../assets/pin1.png" alt="핀" />
    <div class="search-title">
      <RouterLink to="/find" class="search-map">Search Eat</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&family=Poppins:ital,wght@1,800&display=swap');
  .search {
    font-family: 'Poppins', sans-serif;
    width: 50%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5px 70px;
    margin-top: 70px;
    margin-right: 10px;
    box-sizing: border-box;
    outline: none;
    img {
      width: 42px;
      height: 45px;
      margin: 0 14px 8px 0;
    }
     .search-map{
      display: block;
      color: #fff;
      font-size: 50px;
      font-weight: 500;
    }
  }
 
</style>