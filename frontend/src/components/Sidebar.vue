<template>
  <div class="side-container">
    <div v-if="isShow" class="side-bar">
      <div class="input-area">
        <input v-model="keyword" type="text" @keyup.enter="apply" placeholder="어디로 가시나요? (시,도명으로 검색해주세요.)" />
        <img src="../assets/search.png" alt="검색" @click="apply" class="input-img"/>
      </div>
      <div class="my-save">내가 찜한 맛집</div>
      <div v-for="filter in filters" :key="filter.name" class="selects"> 검색결과
        <div v-for="item in filter.item" :key="item" class="select">{{ item }}</div>
      </div>
      <div class="location" @click="results">장소</div>
      <div class="information">
        <div class="place">
        </div>
      </div>
    </div>
    <button class="close-btn" @click="showSide">
      {{ isShow ? 'X' : '>' }}
    </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true,
        keyword: "",
        filters: [
          {
            name:"type",
            item: ["한식", "중식", "일식", "양식", "카페&디저트"]
          }
        ],
      }
    },
    methods: {
      showSide() {
        this.isShow = !this.isShow;
      },
      apply() {
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .side-container {
    background-color: #fff;
    opacity: 90%;
    .side-bar {
      position: relative;
      width: 500px;
      height: 100%;
      display: flex;
      justify-content: center;
      .input-area{
        margin-top: 20px;
        width: 80%;
        height: 6%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        input {
          width: 90%;
          height: 100%;
          padding: 20px 10px;
          border: 1px solid #333;
          box-sizing: border-box;
          border-radius: 10px;
          font-size: 15px;
        }
        .input-img {
          position: absolute;
          right: 30px;
          cursor: pointer;
          padding: 10px 10px;
        }
      }
      .my-save {
        width: 100%;
        height: 8%;
        position: absolute;
        top: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
      }
      .selects {
        position: absolute;
        display: flex;
        top: 130px;
        font-size: 17px;
        color: rgb(35, 34, 34);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .select {
        margin-left: 15px;
        cursor: pointer;
        padding: 10px 10px;
        font-size: 16px;
      }
      .location {
        position: absolute;
        top: 170px;
        width: 90%;
        font-size: 20px;
        padding: 10px;
        border-bottom: 1px solid #c8c8c8;
      }
      .information {
        position: absolute;
        top: 230px;
        width: 95%;
        height: 100%;
        border: 1px solid #333;
        box-sizing: border-box;
      }
    }
    .close-btn{
      position: absolute;
      cursor: pointer;
      background-color: #fff;
      top: 0px;
      right: -30px;
      width: 30px;
      height: 30px;
      // border: 1px solid aliceblue;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 17px;
      color: #333;
    }
  }
</style>