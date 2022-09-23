<template>
  <div class="side-container">
    <div v-if="isShow" class="side-bar">
      <div class="input-area">
        <input v-model="keyword" type="text" @keyup.enter="apply" placeholder="어디로 가시나요?" />
        <img src="../assets/search.png" alt="검색" @click="apply" class="input-img"/>
      </div>
      <div class="my-save">내가 찜한 맛집</div>
      <div class="selects">검색결과
        <div @click="filterSelect" v-for="filter in newFilters" :key="filter.id" class="select"> {{ filter.name }}</div>
      </div>
      <div class="location">장소</div>
      <div class="information" @click="clickInfo">
        <div class="info-msg">{{ message }}</div>
        <ul v-for="data in datas" :key="data.id" class="info-place">
          <div class="place-info">
            <li class="info-name">{{ data.place_name }}</li>
            <li class="info-address">{{ data.address_name }}</li>
            <li class="info-phone">☏ {{ data.phone }}</li>
          </div>
          <div class="info-save">
            <div class="info-btns" @click="saveInfo">
              <img src="../assets/blank-star.png" alt="저장안함" class="front"/>
              <img src="../assets/star.png" alt="저장" class="back" />
            </div>
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
        saveIndex: Number(''),
        keyword: "",
        filters: ['한식','중식','일식','양식','카페'],
        indexArray: []
      }
    },
    methods: {
      saveInfo() {
        const infoBtns = document.querySelectorAll('.info-btns > .front')
        const front = document.querySelectorAll('.front')
        const back = document.querySelectorAll('.back')

        infoBtns.forEach((el, index) => {
          el.onclick = () => {
            this.saveIndex = index
          }
        })
        front[this.saveIndex].style.transform = `rotateY(${180}deg)`
        back[this.saveIndex].style.transform = `rotateY(${0}deg)`
        
      },
      showSide() {
        this.isShow = !this.isShow;
      },
      apply() {
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집'})
      },
      clickInfo() {
        const placeInfo = document.querySelectorAll('ul > .place-info')

        placeInfo.forEach((div,index) => {
          div.onclick = () => {
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
      },
      newFilters() {
        return this.filters.map((filter, index) => {
          return {
            id: index,
            name: filter
          }
        })
      },
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
        top: 215px;
        width: 95%;
        height: 70%;
        box-sizing: border-box; 
        overflow: hidden;
        overflow-y: auto;
        :hover {
            background-color: aliceblue;
          }
        .info-msg{
          position: absolute;
          top: 100px;
          left: 100px;
          font-size: 20px;
        }
        .info-place {
          position: relative;
          padding: 50px;
          line-height: 1.6;
          border-bottom: 1px solid #c8c8c8;
          box-sizing: border-box;
          cursor: pointer;

          .place-info {
            position: absolute;
            width: 75%;
            height: 92%;
            top: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .info-name {
            font-weight: 500;
            font-size: 18px;
            }
            .info-phone {
              font-size: 14px;
              color: rgb(22, 74, 22);
            }
          }
          .info-save {
              position: relative;
              top: -30px;
              right: 10px;
              display: flex;
              justify-content: flex-end;
              .info-btns {
                position: absolute;

                .front {
                position: absolute;
                backface-visibility: hidden;
                transform: rotateY(0deg);
               }
                .back {
                  backface-visibility: hidden;
                  position: absolute;
                  transform: rotateY(-180deg);
                }

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