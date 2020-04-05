<template>
  <div style="height: 100vh">
    <div id="map" ref="rootMap"></div>
    <div id="popup" class="ol-popup" ref="popup">
      <a href="#" id="popup-closer" ref="popupClose" class="ol-popup-closer" @click="close_popup"> </a>
      <div id="popup-content" ref="popContent" v-html="contentText"></div>
    </div>
  </div>
</template>

<script>
  import 'ol/ol.css'
  import { Map, View, Overlay,  } from 'ol'
  import { TileJSON } from 'ol/source'
  import TileLayer  from 'ol/layer/Tile'
  import { toLonLat } from 'ol/proj'
  import { toStringHDMS } from 'ol/coordinate'
  export default {
    name: "MpaLearning",
    data() {
      return {
        map: null,
        overlay: null,
        contentText: '',
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
          .then(() =>{
            this.map.on('singleclick',(e)=>{
            console.log(1);
              this.singleClick(e)
            })
          });
      })
    },
    methods: {
      initMap(){
        return new Promise((resolve,reject)=>{

          this.map = new Map({
            target: this.$refs.rootMap,
            layers: [
              new TileLayer({
                source: new TileJSON({
                  // 把tile的信息保存在一条json当中
                  // Mapbox Tiles 服务的 URL 是：http://api.tiles.mapbox.com/v4/qianyanseu.jomlod6d/{z}/{x}/{y}.png?access_token={your_access_token}，使用时要将{your_access_token}替换成自己账号的 Access Token。
                  url: "https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q",
                  crossOrigin: 'anonymous'
                })
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          });
          resolve();
        })
      },
      close_popup(){
        this.map.getOverlayById('one').setPosition(undefined)
        this.$refs.popupClose.blur();
      },
      singleClick(e){
        let coordinate = e.coordinate; // 获取的是x,y坐标（ESPG:3857,单位米）
        let oneOverlay = new Overlay({
          id:'one',
          element: this.$refs.popup,
          position:coordinate,
          positioning:'center-center', // overlay 对于 position 的相对位置，可能的值包括 bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position 重合；
          autoPan: true, // 当触发 overlay setPosition 方法时触发，当 overlay 超出地图边界时，地图自动移动，以保证 overlay 全部可见
          autoPanAnimation: {
            duration: 250
          }
        });
        let hdms = toStringHDMS(toLonLat(coordinate)); // 转换成经纬度坐标，并格式化
        this.contentText = `<p>你点击了这里</p><code>${hdms}</code>`;
        this.map.addOverlay(oneOverlay)
      }
    }
  }
</script>

<style scoped>
#map {
  width: 100%;
  height: 90%;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 45px;
  left: -50px;
}

.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "✖";
}

#popup-content {
  font-size: 14px;
  font-family: "微软雅黑";
}
#popup-content .markerInfo {
  font-weight: bold;
}
</style>
