<template>
  <div class="container">
    <div class="inner">
      <span>요즘 뜨는 맛집</span>
      <div class="menu">
        <div v-for="menu in menus" :key="menu.name" class="menu-item">
          <RouterLink :to="menu.href">
            <div class="menu-info">
              <div class="menu-name">
                # {{ menu.name }}
              </div>
              <div class="menu-location">
                📍 위치 : {{ menu.location }}
              </div>
              <div class="menu-des">
                {{ menu.description }}
              </div>
            </div>
            <img :src="require(`../assets/photos/${menu.photo}`)" alt="테스트" class="menu-photo"/>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default { 
    data() {
      return {
        menus: [
          {
            name:"가솔린앤로지스",
            location: "부산시 부산진구 동성로",
            href: "/",
            photo: "newly1.jpg",
            description : "장인의 츠케멘을 느끼고싶다면 이곳으로!"
          },
          {
            name:"레스토랑 덱스터",
            location: "서울특별시 강남구 청담동 삼성로",
            href: "/",
            photo: "newly2.jpg",
            description : "버섯 퓨레가 곁들어진 스테이크가 일품!"
          },
          {
            name:"하딩바",
            location: "서울특별시 용산구 신흥로",
            href: "/",
            photo: "newly3.jpg",
            description : "덕수궁 석조전을 건축한 '하딩'의 기백을 느낄 수 있는 원테이블 bar"
          }
        ]
      }
    }
  }
</script>


<style lang="scss" scoped>
  .container {
    background-color: #fefdf8;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      margin-top: 100px;
      width: 1200px;
      height: 100%;
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
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        position: relative;
        .menu-item {
          margin: 0 20px;
          height: 100%;
          display:block;
          flex: 1;
          .menu-info {
            background-color: #131313;
            position: absolute;
            bottom: -20px;
            color: #fff;
            font-size: 17px ;
            width: 29.9%;
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
              font-size: 17px ;
              width: 300px;
              text-align: center;
              letter-spacing: 1.4;
            }
          }
          .menu-photo {
            position: absolute;
            width: 29.9%;
            height: 90.9%;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>