<template>
  <div id="map">
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        map: null,
        markers: [],
        infowindow: null,
        latitude: 0,
        longitude: 0,
      };
    },
    mounted() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;

          if (window.kakao && window.kakao.maps) {
            this.initMap();
          } else {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services,clusterer,drawing";
            document.head.appendChild(script);
          }
        })
      }
    },
    methods: {
      initMap() {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options); // 지도 생성
        let markerPositions = [[this.latitude, this.longitude]]
        this.displayMarker(markerPositions); //마커 생성 
      },

      displayMarker(markerPositions) {
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }

        const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
        );
        
        if (positions.length > 0) {
          this.markers = positions.map(
            (position) =>
              new kakao.maps.Marker({
                map: this.map,
                position,
              })
          );

          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );

          this.map.setBounds(bounds);
        }
      },
      // searchPlaces() {
      //   let ps = new kakao.maps.services.Places();
      //   ps.keywordSearch(keyword, (data, status, pgn) => {
      //     this.search.keyword = keyword;
      //     this.search.pgn = pgn;
          
      //     this.emitter.emit('results', data)
      //     this.data = []
      //     console.log(data)
      //   })
      // }
    }
  }

</script>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>