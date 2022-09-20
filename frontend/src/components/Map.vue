<template>
  <div id="map">
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        map: null,
        latitude: 0,
        longitude: 0,
        markers: []
      }
    },
    computed: {
      markersPositions() {
        return this.$store.state.place.markersPositions
      },
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
          center: new kakao.maps.LatLng(this.latitude, this.longitude), // 지도 중심
          level: 5,
        };
        this.map = new kakao.maps.Map(container, options); // 지도 생성
        this.markerPosition = [[this.latitude, this.longitude]]
        this.displayMarker(this.markerPosition)

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
                position
              })
          );

          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );

          this.map.setBounds(bounds);
        }
      }
    },
    watch: {
      markersPositions() {
        this.displayMarker(this.markersPositions)
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