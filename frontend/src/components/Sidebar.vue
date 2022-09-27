<template>
  <div class="side-container">
    <div v-if="isShow" class="side-bar">
      <div class="input-area">
        <input v-model="keyword" type="text" @keyup.enter="apply" placeholder="어디로 가시나요?" />
        <img src="../assets/search.png" alt="검색" @click="apply" class="input-img"/>
      </div>
      <div class="my-save" @click="getSaveDatas">내가 찜한 맛집
      </div>
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
          <form class="info-save">
            <div class="info-btns" @click="getIndex">
              <div class="front" @click="saveInfo"></div>
              <div class="back" @click="cancleInfo"></div>
            </div>
          </form>
        </ul>
        <template v-if="isSave">
          <ul v-for="saveData in saveDatas" :key="saveData.resIdx" class="saveData-info">
            <li class="saveData-name">{{ saveData.resName }}</li>
            <li class="saveData-add">{{ saveData.resAdd }}</li>
            <a class="saveData-url" :href="saveData.resUrl">자세히 보기: {{ saveData.resUrl }}</a>
          </ul>
        </template>
      </div>
    </div>
    <button class="close-btn" @click="showSide">
      {{ isShow ? 'X' : '>' }}
    </button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        isShow: true,
        keyword: "",
        filters: ['한식','중식','일식','양식','카페'],
      }
    },
    methods: {
      saveInfo(e) {
        e.target.parentNode.children[0].style.transform = `rotateY(${180}deg)`
        e.target.parentNode.children[1].style.transform = `rotateY(${0}deg)`
      },
      cancleInfo(e) {
        e.target.parentNode.children[0].style.transform = `rotateY(${0}deg)`
        e.target.parentNode.children[1].style.transform = `rotateY(${-180}deg)`
      },
      showSide() {
        this.isShow = !this.isShow;
      },
      apply() {
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집'})
        this.isSave = false
        console.log(this.datas)
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
        this.isSave = false
      },
      getIndex() {
        const infoBtn = document.querySelectorAll('form > .info-btns')

        infoBtn.forEach((div,index) => {
          div.onclick = () => {
            axios.post('http://localhost:3000/api/find', {
              resName : this.datas[index].place_name,
              resAdd : this.datas[index].address_name,
              resUrl: this.datas[index].place_url
            })
            .then((res) => {
              console.log(res,'완료')
            })
            .catch((err) => {
              console.log(err)
            })
          }
        })
      },
      getSaveDatas() {
        this.$store.dispatch('save/getSave')
        this.$store.dispatch('place/searchPlaces', {keyword: ''})
        this.isSave = true
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
      saveDatas() {
        return this.$store.state.save.saveData
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
        cursor: pointer;
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
            width: 70%;
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
              position: absolute;
              top: 15px;
              right: 15px;
              width: 50px;
              height: 30px;
              .info-btns {
                .front {
                position: absolute;
                backface-visibility: hidden;
                background-image: url(../assets/blank-star.png);
                background-repeat: no-repeat;
                transform: rotateY(0deg);
                width: 100%;
                height: 100%;
                display: hidden;
               }
                .back {
                  position: absolute;
                  transform: rotateY(-180deg);
                  backface-visibility: hidden;
                  background-repeat: no-repeat;
                  background-image: url(../assets/star.png);
                  width: 100%;
                  height: 100%;
                }

              }
          }
        }
        .saveData-info {
          position: relative;
          padding: 20px;
          line-height: 1.6;
          border-bottom: 1px solid #c8c8c8;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          cursor: pointer;
          .saveData-name {
            font-weight: 500;
            font-size: 18px;
          }
          .saveData-url {
            margin-top: 2px;
            padding: 5px;
            font-size: 14px;
            color:#333;
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