<template>
  <div id="map">
    <div class="controll">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: null,
      infowindow: null,
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement("script")
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map")
      const options = {
        center: new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
        level: 5,
      }
      
      this.map = new kakao.maps.Map(container, options)

      var marker = new kakao.maps.Marker({
        position: this.map.getCenter()
      })
      marker.setMap(this.map)
    }
  }
}

</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>