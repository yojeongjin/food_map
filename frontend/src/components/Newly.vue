<template>
  <div class="container">
    <div class="inner">
      <span>요즘 뜨는 맛집</span>
      <div v-for="newlyData in newlyDatas" :key="newlyData.newlyIdx" class="menu">
        <RouterLink :to="`/newly/${newlyData.newlyIdx}`">
          <div class="menu-item">
            <div class="menu-info">
              <div class="menu-name">
                # {{ newlyData.newlyName }}
              </div>
              <div class="menu-locaition">
                📍 {{ newlyData.newlyLocation }}
              </div>
              <div class="menu-des">
                {{ newlyData.newlyDesc }}
              </div>
            </div>
            <img :src="newlyData.newlyPhoto" alt="음식 사진" class="menu-photo"/>
          </div>
        </RouterLink> 
      </div>
    </div>
  </div>
</template>

<script>
  export default { 
    mounted() {
      this.$store.dispatch('save/getNewly')
    },
    computed: {
      newlyDatas() {
        return this.$store.state.save.newlyDatas
      }
    },
  }
</script>


<style lang="scss" scoped>
  .container {
    background-color: #fefdf8;
    width: 100%;
    padding-bottom: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      margin-top: 100px;
      width: 1200px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      span{
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 35px;
        font-weight: 500;
        color: #383838;
      }
      .menu {
        margin-top: 100px;
        margin-right:20px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        position: relative;
        .menu-item {
          position: absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          display:block;
          flex: 1;
          .menu-info {
            background-color: #131313;
            position: absolute;
            bottom: -20px;
            color: #fff;
            font-size: 17px ;
            width: 100%;
            height: 25.3%;
            z-index: 9;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            .menu-name {
              font-size: 19px ;
              padding-bottom: 12px;
              color: rgb(4, 178, 252);
            }
            .menu-location {
              padding-bottom: 10px;
            }
            .menu-des {
              margin-top: 10px;
              font-size: 17px ;
              width: 300px;
              text-align: center;
              letter-spacing: 1.4;
            }
          }
          .menu-photo {
            position: absolute;
            width: 100%;
            height: 90.9%;
            border-radius: 4px;
          }
        }
      }
    }
  }
  .img  {
    width: 100%;
    height: 100%;
  }
</style>