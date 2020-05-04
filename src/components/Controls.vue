<template>
  <div>
    <el-row :span="24">
      <el-col :span="6">
        比例尺控件
        <el-select v-model="units" size="small" @change="unitsChange">
          <el-option value="degrees">度</el-option>
          <el-option value="imperial">英制英尺</el-option>
          <el-option value="us">美制英尺</el-option>
          <el-option value="nautical">海里</el-option>
          <el-option value="metric" selected>公制</el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        投影
        <el-select v-model="projection" size="small" @change="projChange">
          <el-option value="EPSG:4326">EPSG:4326</el-option>
          <el-option value="EPSG:3857">EPSG:3857</el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        精度
        <el-input-number v-model="precision" @change="precisionChange" :min="1" :max="10" label="精度"></el-input-number>
      </el-col>
      <el-col :span="6">
        结果
        <span id="mouse-position"></span>
      </el-col>
    </el-row>
    <div>

    </div>
    <hr>
    <div id="map"></div>
  </div>
</template>

<script>
  import { Map, View } from 'ol'
  import { OSM } from 'ol/source'
  import { Tile as TileLayer } from 'ol/layer'
  import { defaults as defaultsControl, ScaleLine, FullScreen, ZoomToExtent, OverviewMap, MousePosition, ZoomSlider } from 'ol/control'
  import { defaults as defaultsInteraction, DragRotateAndZoom } from 'ol/interaction'
  import { fromLonLat } from 'ol/proj'
  import { createStringXY } from 'ol/coordinate'
  export default {
    name: "Controls",
    data() {
      return {
        map: null,
        scaleLineControl: null,
        units: '',
        projection:'EPSG:4326',
        precision: 1,
        mousePositionControl: null,
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap();
      })
    },
    methods: {
      initMap(){
        this.scaleLineControl = new ScaleLine();
        this.mousePositionControl = new MousePosition({
          coordinateFormat: createStringXY(this.precision),
          projection: this.projection,
          target:'mouse-position'
        });
        this.map = new Map({
          target: 'map',
          view: new View({
            center: [0,0],
            zoom: 4,
          }),
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          // defaults 是ol.control的集合
          controls: defaultsControl().extend([
            this.scaleLineControl, //标尺
            new FullScreen(), // 全屏
            new ZoomToExtent({
              extent: [ ...fromLonLat([114.383513, 30.890861]), ...fromLonLat([114.079957, 30.315946]) ]
            }), // 缩放
            new OverviewMap({
              className: 'ol-overviewmap ol-custom-overviewmap',
              layers: [
                new TileLayer ({
                  source: new OSM(),
                })
              ],
              collapseLabel: '\u00BB',
              label: '\u00AB',
              collapsed: false,
            }),
            this.mousePositionControl,
            new ZoomSlider(),
          ]),
          interactions: defaultsInteraction().extend([
            new DragRotateAndZoom()
          ])
        })
      },
      unitsChange(val){
        this.scaleLineControl.setUnits(val)
      },
      projChange(val){
        this.mousePositionControl.setProjection(val);
      },
      precisionChange(val){
        this.mousePositionControl.setCoordinateFormat(createStringXY(val));
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>