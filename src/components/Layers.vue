<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-button size="small" @click="setZIndex">OSM图层</el-button>
        <el-checkbox v-model="osmVisible" @change="(val)=>valChange(val,'osm','visible')">可见</el-checkbox>
        透明度<el-slider v-model="osmOpacity" :min="0" :max="1" :step="0.1" @change="(val)=>valChange(val,'osm','opacity')" style="display: inline-block;width: 100px"> </el-slider>

      </el-col>
      <el-col :span="18">
        图层组<el-checkbox v-model="groupVisible" @change="(val)=>valChange(val,'group','visible',)">可见</el-checkbox>
        透明度<el-slider v-model="groupOpacity" :min="0" :max="1" :step="0.1" @change="(val)=>valChange(val,'group','opacity')" style="display: inline-block;width: 100px"> </el-slider>
        <el-col :span="12">
          食物危机主题图层
          <el-checkbox v-model="foodVisible" @change="(val)=>valChange(val,'food','visible')">可见</el-checkbox>
          透明度<el-slider v-model="foodOpacity" :min="0" :max="1" :step="0.1" @change="(val)=>valChange(val,'food','opacity')" style="display: inline-block;width: 100px"> </el-slider>
        </el-col>
        <el-col :span="12">
          世界陆地边界图
          <el-checkbox v-model="landVisible" @change="(val)=>valChange(val,'land','visible')">可见</el-checkbox>
          透明度<el-slider v-model="landOpacity" :min="0" :max="1" :step="0.1" @change="(val)=>valChange(val,'land','opacity')" style="display: inline-block;width: 100px"> </el-slider>
        </el-col>
      </el-col>
    </el-row>
    <div id="map"></div>
  </div>
</template>

<script>
  import { Map, View } from 'ol'
  import { fromLonLat } from 'ol/proj'
  import { Tile as TileLayer, Group as LayerGroup,} from 'ol/layer'
  import { OSM, TileJSON, } from 'ol/source'
  export default {
    name: "Layers",
    data() {
      return {
        map:null,
        osmVisible:true,
        foodVisible:true,
        landVisible:true,
        osmOpacity:1,
        foodOpacity:1,
        landOpacity:1,
        groupVisible:true,
        groupOpacity:1,
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
      })
    },
    methods: {
      initMap(){
        this.map = new Map({
          target: 'map',
          view: new View({
            center: fromLonLat([114.547876,30.497948]),
            zoom: 4,
          }),
          layers: [
            new TileLayer({
              className: 'osm',
              source: new OSM()
            }),
            new LayerGroup({
              className: 'group',
              minResolution: 2000,
              maxResolution: 20000,
              layers:[
                new TileLayer({
                  className: 'food',
                  source: new TileJSON({
                    url: 'https://api.tiles.mapbox.com/v4/mapbox.20110804-hoa-foodinsecurity-3month.json?securee&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q',
                    crossOrigin: 'anonymous'
                  })
                }),
                new TileLayer({
                  className: 'land',
                  source: new TileJSON({
                    url: 'https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q',
                    crossOrigin: 'anonymous'
                  })
                }),
              ]
            })
          ]
        })
      },
      valChange(val,type,domain){
        let fn = (item,str)=>{
          if (type === str){
            if (item.className_ === str){
              if (domain === 'visible'){
                item.setVisible(val)
              }
              if (domain === 'opacity'){
                item.setOpacity(val)
              }
            }
          }
        };
        this.map.getLayers().forEach(item => {
          fn(item,'osm');
          fn(item,'group');
          if (item instanceof  LayerGroup){
            // instanceof来检测某个对象是不是另一个对象的实例
            item.getLayers().forEach(subItem => {
              fn(subItem,'food');
              fn(subItem,'land');
            })
          }
        });
      },
      setZIndex(){
        // zIndex 相等时，按照加入layers的顺序
        // zIndex 不等时，较大的排在上面
        this.map.getLayers().forEach((item,i) => {
          if (i === 0){
            item.setZIndex(5)
           console.log(item.getZIndex())
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>