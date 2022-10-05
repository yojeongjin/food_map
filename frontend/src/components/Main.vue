<template>
  <div class="main">
    <div class="inner">
      <Search class="search"/>
      <div @click="show" class="random">
        오늘 뭐먹지?
      </div>
      <div v-if="isShow" class="random-modal">
        <div class="random-modal-inner">
          <div class="random-modal-title">
            <h1>오늘 뭐먹지?</h1>
            <h3>딱 맞는 메뉴를 골라드릴게요!</h3>
          </div>
          <div class="random-modal-menu">
            <div class="menu-slot">
              <ul v-for="menuData in menuDatas" :key="menuData.id" class="slot-box" :class="{ 'rolling': isRolling, 'rolling2': isRolling2 }">
                <li class="slot-item"> {{ menuData.menuName }}</li>
              </ul>
            </div>
          </div>
          <div class="random-modal-return">
            <div class="slot-return" @click="getMenu">
              <img src="../assets/rotate.png" alt="다시찾기"/>
              다시 골라주세요🥲
            </div>
          </div>
        </div>
        <button @click="show" class="close-btn"><img src="../assets/close.png" alt="닫기" class="btn-icon"/></button>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search.vue';

  export default {
    data() {
      return {
        isShow: false,
        isRolling: true,
        isRolling2: false
      }
    },
    mounted() {
      this.$store.dispatch('save/getMenu')
    },
    methods: {
      show() {
        this.isShow = !this.isShow
      },
      getMenu() {
        this.$store.dispatch('save/getMenu')
        this.isRolling = !this.isRolling
        this.isRolling2 = !this.isRolling2
      }
    },
    computed: {
      menuDatas() {
        return this.$store.state.save.menuDatas
      }
    },
    components: { Search }
  }
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
  
  .main {
    margin-top: 170px;
    // background-color: rgb(253, 230, 188);
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 80%;
      height: 500px;
      display: flex;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .search {
        position: absolute;
        top: 100px;
      }
      .random {
        position: absolute;
        bottom: 80px;
        font-size: 20px;
        font-weight: 500;
        padding: 10px 50px;
        display: flex;
        color: rgb(252, 84, 0);
        cursor: pointer;
      }
      .random-modal {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        position: relative;
        .random-modal-inner {
          width: 95%;
          height: 95%;
          display: flex;
          justify-content: center;
          align-items: center;
          .random-modal-title {
            position: absolute;
            top: 60px;
            width: 60%;
            height: 20%;
            text-align: center;
            border-bottom: 1px dashed black;
            h1 {
              margin-top: 10px;
              font-size: 50px;
              font-weight: 700;
            }
            h3 {
              margin-top: 10px;
            }
          }
          .random-modal-menu {
            position: absolute;
            top: 200px;
            width: 50%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            .menu-slot {
              width: 100%;
              height: 35%;
              overflow: hidden;
              background-color: #ffc400;
              border-radius: 20px;
              .slot-box {
                animation-duration: 1.5s;
                animation-timing-function: linear;
                animation-iteration-count: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                &.rolling{
                animation-name: rotate1;
                }
                &.rolling2 {
                  animation-name: rotate2;
                }
                .slot-item {
                  font-family: "Roboto Mono", monospace;
                  font-size: 20px;
                  font-weight: 500;
                  color: orangered;
                  height: 50px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
          .random-modal-return {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 35%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .slot-return {
              font-size: 15px;
              font-weight: 400;
              width: 30%;
              height: 30%;
              border: 1px solid #c8c8c8;
              box-sizing: border-box;
              border-radius: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 15px;
                height: 15px;
                margin-right: 5px;
              }
            }
          }
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 5px;
          padding: 0px 20px;
          width: 30px;
          height: 30px;
          background-color: transparent;
          border-style: none;
          cursor: pointer;

          .btn-icon {
            width: 18px;
            height: 18px;
          }

        }
      }
    }
    @keyframes rotate1 {
      0% {
        transform: rotateX(0deg);
        margin-top: -50px;
      }
      20%{
        transform: rotateX(-1080deg);
        margin-top: -40px;
      }
      50%{
        transform: rotateX(-1380deg);
        margin-top: -30px;
      }
      70%{
        transform: rotateX(-1420deg);
        margin-top: -20px;
      }
      90%{
        transform: rotateX(-1435deg);
        margin-top: -10px;
      }
      100% {
        transform: rotateX(-1440deg);
      }
    }
    @keyframes rotate2 {
      0% {
        transform: rotateX(0deg);
        margin-top: -50px;
      }
      50%{
        transform: rotateX(-1280deg);
        margin-top: -40px;
      }
      70%{
        transform: rotateX(-1384deg);
        margin-top: -30px;
      }
      90%{
        transform: rotateX(-1399deg);
        margin-top: -10px;
      }
      100% {
        transform: rotateX(-1404deg);
      }
    }
  }
</style>