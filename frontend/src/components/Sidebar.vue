<template>
  <div class="side-container">
    <div v-if="isShow" class="side-bar">
      <div class="input-area">
        <input v-model="keyword" type="text" @keyup.enter="apply" placeholder="어디로 가시나요?" />
        <img src="../assets/search.png" alt="검색" @click="apply" class="input-img"/>
      </div>
      <div class="my-save">내가 찜한 맛집</div>
      <div class="selects">검색결과
        <div @click="filterSelect" v-for="filter in filters" :key="filter.id" id="filter.id" class="select"> {{ filter.type }}</div>
      </div>
      <div class="location">장소</div>
      <div class="information">
        <div class="msg">{{ message }}</div>
        <ul v-for="data in datas" :key="data.id" class="place" @click="clickInfo">
          <div>
            <li class="name">{{ data.place_name }}</li>
            <li class="address">{{ data.address_name }}</li>
          </div>
        </ul>
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
            type: '한식',
            id: 1
          },
          {
            type: '중식',
            id: 2
          },
          {
            type: '일식',
            id: 3
          },
          {
            type: '양식',
            id: 4
          },
          {
            type: '카페',
            id: 5
          }
        ],
      }
    },
    methods: {
      showSide() {
        this.isShow = !this.isShow;
      },
      apply() {
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집'})
      },
      clickInfo() {
        const placeInfo = document.querySelectorAll('ul > div')

        placeInfo.forEach((li,index) => {
          li.onclick = () => {
            this.emitter.emit('info', index)
          }
        })
      },
      filterSelect(e) {
        let type = e.target.outerText
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집' + `'${type}'`})
      }

    },
    computed: {
      datas() {
        return this.$store.state.place.datas
      },
      message() {
        return this.$store.state.place.msg
      }
    },
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
        width: 100%;
        top: 130px;
        font-size: 17px;
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
        border-bottom: 1px solid #333;
      }
      .information {
        position: absolute;
        top: 220px;
        width: 95%;
        height: 70%;
        box-sizing: border-box; 
        overflow: hidden;
        overflow-y: auto;
        :hover {
            background-color: aliceblue;
          }
        .msg{
          position: absolute;
          top: 100px;
          left: 100px;
          font-size: 20px;
        }
        .place {
          padding: 15px;
          // text-align: center;
          line-height: 1.7;
          border-bottom: 1px solid #c8c8c8;
          box-sizing: border-box;
          cursor: pointer;
          div{
            margin-left: 100px;
            .name {
            font-weight: 500;
            font-size: 18px;
          }
          }
        }
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