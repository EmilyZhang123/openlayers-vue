<template>
  <div>
    缩放到湖北省
    <el-button @click="testClick(1)" size="small">匹配高度</el-button>
    <el-button @click="testClick(2)" size="small">匹配最合适的分辨率</el-button>
    <el-button @click="testClick(3)" size="small">使用minResolution</el-button>
    <el-button @click="testClick(4)" size="small">匹配宽度</el-button>
    <el-button @click="testClick(4)" size="small">中心定位武汉</el-button>
    <hr>
    <div id="map"></div>
  </div>

</template>

<script>
  import { Map, View } from 'ol'
  import TileLayer from 'ol/layer/Tile'
  import VectorLayer from 'ol/layer/Vector'
  import { OSM, Vector } from 'ol/source'
  import  { GeoJSON }  from 'ol/format'
  import { Style, Fill, Stroke, Circle } from 'ol/style'
  export default {
    name: "AdvancedPositioning",
    data(){
      return {
        map: null,
        vectorSource: null,
        view:null,
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap();
      })
    },
    methods:{
      initMap(){
        return new Promise(resolve=>{
           this.vectorSource  = new Vector({
            // url: '../mock/hubei.json',
            url: 'https://geo.datav.aliyun.com/areas_v2/bound/420000.json',
            format: new GeoJSON()
          });
          let vectorStyle = new Style({
            fill: new Fill({
              color: 'rgba(255,0,0,0.1)'
            }),
            store: new Stroke({
              color: '#319FD3',
              width: 1
            }),
            image: new Circle({
              radius: 4,
              fill: new Fill({
                color:'rgba(255,0,0,0.6)'
              }),
              store: new Stroke({
                color: '#319FD3',
                width: 5
              })
            })
          });
          this.view = new View({
            center: [0,0],
            zoom: 1
          });
          this.map = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new OSM()
              }),
              new VectorLayer({
                source: this.vectorSource,
                style: vectorStyle
              })
            ],
            view: this.view
          })
        })
      },
      testClick(num){
        let features  = this.vectorSource.getFeatures(); // 获取要素集合的第一个元素
        let polygon = features[0].getGeometry(); //获取元素的几何体
        // let point = features[1].getGeometry(); //获取元素的几何体
        if (num === 1){
          this.view.fit(polygon,{padding: [170, 50, 30, 150],constrainResolution: false}); // constrainResolution:false 不受分辨率限制
        }
        if (num === 2) {
          this.view.fit(polygon,{padding: [170, 50, 30, 150]}); // constrainResolution:false 不受分辨率限制
        }
        if (num === 3) {
          this.view.fit(polygon,{padding: [170, 50, 30, 150], minResolution: 250}); // constrainResolution:false 不受分辨率限制
        }
        if (num === 4) {
          this.view.fit(polygon,{padding: [170, 50, 30, 150], nearest: true}); // constrainResolution:false 不受分辨率限制
        }
        if (num === 5){
          let size  = this.map.getSize();
          this.view.centerOn([114.259269,30.626812],size,[570,500])
        }
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>