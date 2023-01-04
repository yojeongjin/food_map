<template>
  <div class="side-container">
    <template v-if="isShow">
      <div class="side-bar">
        <div class="side-input">
          <input v-model="keyword" type="text" @keyup.enter="apply" placeholder="어디로 가시나요?" />
          <img src="../assets/search.png" alt="검색" @click="apply" class="input-img"/>
        </div>
        <div class="place-save" @click="getSaveDatas">내가 찜한 맛집</div>
        <div class="place-search">검색결과
          <div @click="filterSelect" v-for="filter in newFilters" :key="filter.id" class="place-search__content"> {{ filter.name }}</div>
        </div>
        <div class="place__title">장소</div>
        <div class="place-information">
          <div class="info-msg">{{ message }}</div>
          <ul v-for="data in datas" :key="data.id" class="info-place">
            <div :data-code="data.id" class="info-place__elements" @click="clickOverlay">
              <li :data-code="data.id" class="info-name">{{ data.place_name }}</li>
              <li :data-code="data.id" class="info-address">{{ data.address_name }}</li>
              <li :data-code="data.id" class="info-phone">☏ {{ data.phone }}</li>
            </div>
            <form class="info-save">
              <div class="info-btns">
                <div :data-code="data.id" class="front" @click="saveInfo"></div>
                <div class="back"></div>
              </div>
            </form>
          </ul>
          <template v-if="isSave">
            <ul v-for="saveData in saveDatas" :key="saveData.resIdx" class="saveData-info">
              <li class="saveData-name"> {{ saveData.resName }} </li>
              <li class="saveData-add"> {{ saveData.resAdd }} </li>
              <a class="saveData-url" :href="saveData.resUrl">자세히 보기: {{ saveData.resUrl }}</a>
              <img :data-code="saveData.resIdx" src="../assets/bin.png" class="saveData-img" @click="removeSave" />
            </ul>
          </template>
        </div>
      </div>
    </template>
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
        userIdx: '',
        saveDatas: []
      }
    },
    mounted() {
    const jwt = localStorage.getItem('x-access-token')

    axios.get('https://www.searcheat.shop/api/signin', {
      headers: { 'x-access-token': jwt }
    })
    .then((res) => {
      if(res.data.code === 200) {
        this.userIdx = res.data.result.userIdx
      } else {
        return
      }
    })
  },
    methods: {
      saveInfo(e) {
        e.target.parentNode.children[0].style.transform = `rotateY(${180}deg)`
        e.target.parentNode.children[1].style.transform = `rotateY(${0}deg)`
        this.clickPlaceSave(e)
      },
      showSide() {
        this.isShow = !this.isShow;
      },
      apply() {
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집'})
        this.isSave = false
      },
      clickOverlay(e) {
        let index = e.target.dataset.code
        this.emitter.emit('info', index)
      },
      filterSelect(e) {
        let type = e.target.outerText
        this.$store.dispatch('place/searchPlaces', {keyword: this.keyword + '맛집' + `'${type}'`})
        this.isSave = false
      },
      clickPlaceSave(e) {
        let index = e.target.dataset.code

        axios.post('https://www.searcheat.shop/api/find', {
          resName : this.datas[index].place_name,
          resAdd : this.datas[index].address_name,
          resUrl: this.datas[index].place_url,
          userIdx: this.userIdx
        })
        .then((res) => {
          console.log(res,'완료')
        })
        .catch((err) => {
          console.log(err)
          alert('이미 있는 값 입니다.')
          e.target.parentNode.children[0].style.transform = `rotateY(${0}deg)`
          e.target.parentNode.children[1].style.transform = `rotateY(${-180}deg)`
        })
      },
      getSaveDatas() {
        axios.get('https://www.searcheat.shop/api/find', {params: {
          userIdx: this.userIdx
        }})
        .then((res) => {
        console.log(res)
        this.saveDatas = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
        this.$store.dispatch('place/searchPlaces', {keyword: ''})
        this.isSave = true
      },
      removeSave(e) {
        let index = e.target.dataset.code
        let resIdx = this.saveDatas[index].resIdx
        console.log(this.saveDatas[index])
        console.log(resIdx)
        console.log(e.tartget.dataCode)

        axios.delete('https://www.searcheat.shop/api/find', {params: {
          resIdx: resIdx
        }})
        .then((res) => {
          alert('삭제되었습니다.')
          console.log(res,'삭제완료')
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    computed: {
      datas() {
        return this.$store.state.place.datas.map((data, index) => {
          return {
            id: index,
            address_name: data.address_name,
            phone: data.phone,
            place_name: data.place_name,
            place_url: data.place_url            
          }
        })
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
      .side-input{
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
      .place-save {
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
      .place-search {
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
      .place-search__content {
        margin-left: 15px;
        cursor: pointer;
        padding: 10px 10px;
        font-size: 16px;
      }
      .place__title {
        position: absolute;
        top: 170px;
        width: 90%;
        font-size: 20px;
        padding: 10px;
        border-bottom: 1px solid #333;
      }
      .place-information {
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
          width: 100%;
          padding: 50px;
          line-height: 1.6;
          border-bottom: 1px solid #c8c8c8;
          box-sizing: border-box;
          cursor: pointer;

          .info-place__elements {
            position: absolute;
            width: 100%;
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
          width: 100%;
          padding: 15px 20px;
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
          .saveData-img {
            position: absolute;
            top: 10px;
            right: 0px;
            padding: 10px;
            &:hover {
              scale: 1.2;
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