<template>
  <div v-for="itemData in itemDatas" :key="itemData.newlyIdx" class="container">
    <div class="inner">
      <swiper :pagination="true" :navigation="true" :modules="modules" class="swiper">
        <swiper-slide><img :src="itemData.newlyPhoto" alt="대표사진" class="img"/></swiper-slide>
        <swiper-slide><img :src="itemData.newlyPhoto2" alt="대표사진" class="img"/></swiper-slide>
        <swiper-slide><img :src="itemData.newlyPhoto3" alt="대표사진" class="img"/></swiper-slide>
      </swiper>
      <div class="specs">
        <div class="title"> {{ itemData.newlyName }}</div>
        <div class="location"> 📍위치: {{ itemData.newlyLocation }}</div>
        <div class="detail">{{ itemData.newlyDetail }}</div>
        <div>
          <h3>Recommend</h3>
          {{ itemData.newlyRecmm }}
        </div>
        <div>
          <h3>Price</h3>
          {{ itemData.newlyPrice }}
        </div>
        <div>
          <h3>Time</h3>
          {{ itemData.newlyTime }}
        </div>
        <div>
          <h3>Etc</h3>
          {{ itemData.newlyEtc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination,Navigation } from 'swiper'

export default {
  data() {
    return {
      itemDatas: [],
    }
  },
  mounted() {
    axios.get('http://3.36.188.55/api/newly/'+this.$route.params.idx, {params: {
      idx: this.$route.params.idx
    }})
    .then((res) => {
      console.log(res)
      this.itemDatas = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  components: { Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Pagination, Navigation]
    }
  }
}
</script>

<style>
  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
  }
</style>

<style lang="scss" scoped>
  .container {
    margin-top: 100px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      width: 80%;
      height: 90%;
      display: flex;
      .swiper {
        position: relative;
        flex-shrink: 0;
        margin-right: 70px;
        width: 600px;
        height: 600px;
        .img {
          width:100%;
          height: 100%;
        }
      }
      .specs {
        flex-grow: 1;
        .title{
          font-size: 70px;
          font-weight: 500;
          line-height: 1;
          margin-bottom: 30px;
        }
        .location{
          color: #333;
        }
        .detail{
          margin-top: 20px;
          line-height: 1.5;
          font-size: 15px;
          color: rgb(137, 137, 137);
        }
        h3 {
          margin: 24px 0 6px;
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
</style>