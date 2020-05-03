<template>
  <div id="map" ref="map">
    
  </div>
</template>

<script>
   import {Map,View,Graticule} from 'ol'
   import TileLayer from 'ol/layer/Tile'
   import {fromLonLat} from 'ol/proj'
   import {OSM} from 'ol/source'
   import Stroke from 'ol/style/Stroke'
   export default {
      name: "Graticule",
      data() {
         return {
            map:null,
         }
      },
      mounted() {
         this.$nextTick(()=>{
            this.initMap(()=>{
               (new Graticule({
                  strokeStyle: new Stroke({
                     color:'red',
                     width:1,
                     lineDash:[4]
                  })
               })).setMap(this.map)
            })
         })
      },
      methods: {
         initMap(callback){
            this.map = new Map({
               target:'map',
               view: new View({
                  center:fromLonLat([4.8,47.75]), // 将经纬度坐标转换成x,y坐标
                  zoom:5
               }),
               layers:[
                  new TileLayer ({
                        source: new OSM()
                  })
               ]
            })
            callback()
         }
      },
   }
</script>

<style lang="scss" scoped>
div {}
</style>