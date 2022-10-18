<template>
  <Loader v-if="loading"/>
  <div id="map"></div>
</template>

<script>
import Loader from './Loader.vue'

  export default {
    data() {
      return {
        map: null,
        latitude: 0,
        longitude: 0,
        markers: [],
        loading: true
      };
    },
    computed: {
        markersPositions() {
            return this.$store.state.place.markersPositions;
        },
        datas() {
            return this.$store.state.place.datas;
        },
    },
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.latitude = pos.coords.latitude;
                this.longitude = pos.coords.longitude;
                if (window.kakao && window.kakao.maps) {
                    this.initMap();
                }
                else {
                    const script = document.createElement("script");
                    /* global kakao */
                    script.onload = () => kakao.maps.load(this.initMap);
                    script.src =
                        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=46941455d312ab0ca03444dd520c40b9&libraries=services,clusterer,drawing";
                    document.head.appendChild(script);
                }
            });
        }
        this.emitter.on("info", this.onReceive);
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(this.latitude, this.longitude),
                level: 5,
            };
            this.map = new kakao.maps.Map(container, options); // 지도 생성
            this.marker = new kakao.maps.Marker({
                map: this.map,
                position: options.center
            });
            this.loading = false
        },
        displayMarker(markersPositions) {
            if (this.markers.length > 0) {
                this.markers.forEach((marker) => marker.setMap(null));
                this.markers = [];
            }
            for (let i = 0; i < this.datas.length; i++) {
                let position = new kakao.maps.LatLng(this.datas[i].y, this.datas[i].x);
                let marker = this.addMarker(position, i);
                let customOverlay = new kakao.maps.CustomOverlay({
                    position,
                    clickable:true,
                    xAnchor: 0.5,
                    yAnchor: 1.1
                })
                let content = document.createElement('div')
                content.className = 'info-content'

                let title = document.createElement('div')
                title.className = 'info-title'
                title.appendChild(document.createTextNode(`${this.datas[i].place_name}`));
                content.appendChild(title)

                let phone = document.createElement('div')
                phone.className = 'info-phone'
                phone.appendChild(document.createTextNode(`${this.datas[i].phone}`));
                content.appendChild(phone)

                let detail = document.createElement('div')
                detail.className = 'info-detail'
                detail.appendChild(document.createTextNode(`${this.datas[i].place_url}`));
                content.appendChild(detail)

                let close = document.createElement('div')
                close.className = 'info-close'
                close.appendChild(document.createTextNode('확인'));
                close.onclick = () => {
                  customOverlay.setMap(null)
                }
                content.appendChild(close)

                customOverlay.setContent(content)
                kakao.maps.event.addListener(marker, "click", () => {
                  customOverlay.setMap(this.map);
                })
            }
            const positions = markersPositions.map((position) => new kakao.maps.LatLng(...position));
            const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

            this.map.setBounds(bounds);
        },
        addMarker(position, idx) {
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", imageSize = new kakao.maps.Size(36, 37), imgOptions = {
                spriteSize: new kakao.maps.Size(36, 691),
                spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
                offset: new kakao.maps.Point(13, 37)
            }, markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions), marker = new kakao.maps.Marker({
                position: position,
                image: markerImage
            });
            marker.setMap(this.map);
            this.markers.push(marker);
            return marker;
        },
        onReceive(i) {
            let position = new kakao.maps.LatLng(this.datas[i].y, this.datas[i].x);
            let customOverlay = new kakao.maps.CustomOverlay({
                position,
                clickable:true,
                xAnchor: 0.5,
                yAnchor: 1.1,
            })

            let content = document.createElement('div')
            content.className = 'info-content'

            let title = document.createElement('div')
            title.className = 'info-title'
            title.appendChild(document.createTextNode(`${this.datas[i].place_name}`));
            content.appendChild(title)

            let phone = document.createElement('div')
            phone.className = 'info-phone'
            phone.appendChild(document.createTextNode(`${this.datas[i].phone}`));
            content.appendChild(phone)

            let detail = document.createElement('div')
            detail.className = 'info-detail'
            detail.appendChild(document.createTextNode(`${this.datas[i].place_url}`));
            content.appendChild(detail)

            let close = document.createElement('div')
            close.className = 'info-close'
            close.appendChild(document.createTextNode('확인'));
            close.onclick = () => {
              customOverlay.setMap(null)
            }
            content.appendChild(close)

            
            customOverlay.setContent(content);
            customOverlay.setMap(this.map);

            this.map.setCenter(position);
        },
    },
    watch: {
        markersPositions() {
            this.displayMarker(this.markersPositions);
        }
    },
    components: { Loader }
}

</script>

<style lang="scss">
  #map {
    width: 100%;
    height: 100vh;
    .info-content {
      background-color: #fff;
      opacity: 90%;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 10px 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info-title {
        margin-bottom: 5px;
        font-size: 15px;
        color: rgb(255, 111, 0);
        font-weight: 500;
        text-align: center;
      }
      .info-phone {
        font-size: 12px;
        color: #333;
      }
      .info-detail {
        margin-top: 7px;
        font-size: 12px;
        color: rgb(16, 67, 249);
      }
      .info-close {
        text-align: center;
        margin-top: 10px;
        padding: 10px 0 10px 0;
        font-size: 13px;
        width: 100%;
        height: 100%;
        border-top: 1px solid #c8c8c8;
        color: rgb(255, 111, 0);
      }
    }
  }
</style>