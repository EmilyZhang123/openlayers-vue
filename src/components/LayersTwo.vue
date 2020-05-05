<template>
  <div>
    <div>
      <el-select v-model="extendVal">
        <el-option value="hubei"> 湖北</el-option>
        <el-option value="chongqing"> 重庆</el-option>
      </el-select>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
  import { Map, View } from 'ol'
  import { Tile as TileLayer } from 'ol/layer'
  import { TileJSON, OSM } from 'ol/source'
  import { transformExtent, fromLonLat } from 'ol/proj'
  export default {
    name: "LayersTwo",
    data() {
      return {
        map: null,
        overlayLayer:null,
        layerFirst:null,
        extendVal:"湖北"
      }
    },
    computed:{
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
      })
    },
    methods: {
      initMap(){
        this.overlayLayer = new TileLayer({
          extent:transformExtent([116.560562,41.034901, 102.983357,26.347873], 'EPSG:4326', 'EPSG:3857'),
          source: new TileJSON({
            url: 'https://api.tiles.mapbox.com/v4/mapbox.world-black.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q',
            crossOrigin: 'anonymous'
          })
        });
        this.layerFirst = new TileLayer({
         /* source: new TileJSON({
            url: 'https://api.tiles.mapbox.com/v4/mapbox.world-light.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q',
            crossOrigin: 'anonymous'
          })*/
         source: new OSM()
        });
        this.map = new Map({
          target: 'map',
          view: new View({
            center: fromLonLat([104.933471,36.366684]),
            zoom: 5
          }),
          layers: [
            this.layerFirst,
            this.overlayLayer
          ]
        });
        this.layerFirst.on('precompose',e => {
          console.log(e)
          let ctx = e.context;
          let pixelRatio = e.frameState.pixelRatio; // 获取像素密度
          let size = this.map.getSize();
          ctx.translate(size[0] / 2 * pixelRatio, size[1] / 2 * pixelRatio);
          //缩放
          ctx.scale(3 * pixelRatio, 3 * pixelRatio);
          //平移
          ctx.translate(-75, -80);
          ctx.beginPath();
          ctx.moveTo(75, 40);
          ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
          ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
          ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
          ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
          ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
          ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
          ctx.clip();
          ctx.translate(75, 80);
          ctx.scale(1 / 3 / pixelRatio, 1 / 3 / pixelRatio);
          ctx.translate(-size[0] / 2 * pixelRatio, -size[1] / 2 * pixelRatio);
        });

        this.layerFirst.on('postcompose', e => {
          let ctx = e.context;
          ctx.restore();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>