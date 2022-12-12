<template>
  <div class="container">
    <div class="inner">
      <h2>요즘 뜨는 맛집</h2>
      <div v-for="newlyData in newlyDatas" :key="newlyData.newlyIdx" class="menu">
        <RouterLink :to="`/newly/${newlyData.newlyIdx}`">
          <div class="menu-item">
            <div class="menu-photo">
              <img :src="newlyData.newlyPhoto" alt="음식 사진" />
            </div>

            <div class="menu-info">
              <h3 class="menu-name">
                # {{ newlyData.newlyName }}
              </h3>
              <h4>
                📍 {{ newlyData.newlyLocation }}
              </h4>
              <p>
                {{ newlyData.newlyDesc }}
              </p>
            </div>
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
    padding-bottom: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      margin-top: 100px;
      width: 80%;
      height: 650px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      h2{
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 35px;
        font-weight: 500;
        color: #383838;
      }
      .menu {
        flex: 1;
        height: 90%;
        margin-top: 50px;
        padding: 0 10px;
        .menu-item {
          .menu-photo {
            width: 100%;
            height: 450px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .menu-info {
          background-color: #131313;
          height: 120px;
          padding: 5px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #fff;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          > h3 {
            font-size: 19px ;
            padding-bottom: 12px;
            color: #04b2fc;
          }
          > h4 {
            padding-bottom: 10px;
            font-size: 15px;
          }
          > p {
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>