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
        markers: [],
        infowindow: null
      }
    },
    computed: {
      markersPositions() {
        return this.$store.state.place.markersPositions
      },
      datas() {
        return this.$store.state.place.datas
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
      this.emitter.on('info', this.onReceive)
    },
    methods: {
      initMap() {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(this.latitude, this.longitude), // 지도 중심
          level: 6,
        };
        this.map = new kakao.maps.Map(container, options); // 지도 생성
        this.marker = new kakao.maps.Marker({
          map: this.map,
          position: options.center
        })
      },
      displayMarker(markersPositions) {
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null))
          this.markers = []
        }
        for(let i=0; i<this.datas.length; i++) {
          let position = new kakao.maps.LatLng(this.datas[i].y, this.datas[i].x)
          let marker = this.addMarker(position, i)

          let customOverlay = new kakao.maps.CustomOverlay({
          position,
          xAnchor: 0.5,
          yAnchor: 1.05,
          })

          let content = `<div class="info-content">${this.datas[i].place_name}</div>`
          customOverlay.setContent(content)

          kakao.maps.event.addListener(marker, 'click', () => {
            customOverlay.setMap(this.map)
          })
        }
        
        const positions = markersPositions.map(
          (position) => new kakao.maps.LatLng(...position)
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );
        this.map.setBounds(bounds)
      },
      addMarker (position, idx) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
        imageSize = new kakao.maps.Size(36, 37), 
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), 
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10),
            offset: new kakao.maps.Point(13, 37)
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position,
            image: markerImage 
        });

        marker.setMap(this.map)
        this.markers.push(marker)

        return marker
      },
      onReceive(i) {
        let position = new kakao.maps.LatLng(this.datas[i].y, this.datas[i].x)

        console.log(i)

        let customOverlay = new kakao.maps.CustomOverlay({
          position,
          xAnchor: 0.5,
          yAnchor: 1.05,
        });

        let content = `<div class="info-content">${this.datas[i].place_name}</div>`
        customOverlay.setContent(content)
        customOverlay.setMap(this.map)

        let bounds = new kakao.maps.LatLngBounds()
        bounds.extend(position)
      },
    },
    watch: {
      markersPositions() {
        this.displayMarker(this.markersPositions)
      }
    }
  }

</script>

<style lang="scss">
  #map {
    width: 100%;
    height: 100vh;
    .info-content {
      border: 1px solid black;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 10px 10px;
    }
  }
</style>