<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        半径<el-slider v-model="radius" @change="radiusChange"/>
      </el-col>
      <el-col :span="12">
        模糊<el-slider v-model="blur" @change="blurChange"/>
      </el-col>
    </el-row>
    <div id="map"></div>
  </div>

</template>

<script>
  import { Map, View } from 'ol'
  import { Heatmap, Tile as TileLayer,} from 'ol/layer'
  import { Stamen, Vector as VectorSource, } from 'ol/source'
  import { KML } from 'ol/format'
  export default {
    name: "HeatMap",
    data() {
      return {
        map: null,
        vector:null,
        radius: 10,
        blur:5
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
      })
    },
    methods: {
      initMap(){
        let raster = new TileLayer({
          source: new Stamen({
            layer: 'toner'
          })
        });
        let vector = new Heatmap({
          source: new VectorSource({
            url: '../mock/2012_Earthquakes_Mag5.kml',
            format: new KML({
              extractStyles: false
            }),
            blur: this.blur,
            radius: this.radius
          })
        });
        vector.getSource().on('addFeature',e => {
          let name = e.feature.get('name');
          let magnitude = parseFloat(name.substr(2));
          e.feature.set('weight',magnitude -5)
        });
        this.map  = new Map({
          target: 'map',
          view: new View({
            center: [0, 0],
            zoom: 2
          }),
          layers:[
          /*  new TileLayer({
              source: new Stamen({
                layer: 'toner'
              })
            }),*/
            vector
          ]
        })
      },
      radiusChange(val){
        this.radius = val;
        this.vector.setBlur(parseInt(val));
      },
      blurChange(val){
        this.blur = val;
        this.vector.setBlur(parseInt(val));
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>