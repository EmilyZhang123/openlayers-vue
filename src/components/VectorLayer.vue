<template>
  <div>
    <div id="map">

    </div>
  </div>
</template>

<script>
  import { Map, View } from 'ol'
  import {Vector as VectorLayer,} from 'ol/layer'
  import { Vector as VectorSource } from 'ol/source'
  import {GeoJSON} from 'ol/format'
  import {Style, Fill, Stroke, Circle} from 'ol/style'
  import { MultiPoint } from 'ol/geom'
  export default {
    name: "VectorLayer",
    data() {
      return {
        map: null,
        geojsonObject: {
          'type': 'FeatureCollection',
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG:3857'
            }
          },
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6],
                  [-3e6, 6e6], [-5e6, 6e6]]]
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6],
                  [0, 6e6], [-2e6, 6e6]]]
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6],
                  [3e6, 6e6], [1e6, 6e6]]]
              }
            },
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [[[-2e6, -1e6], [-1e6, 1e6],
                  [0, -1e6], [-2e6, -1e6]]]
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap();
      })
    },
    methods: {
      initMap(){
        let style = [
          new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            })
          }),
          new Style({
            image: new Circle({
              radius: 5,
              fill: new Fill({
                color: 'orange'
              })
            }),
            geometry(feature){
              // 返回多边形polygon的第一个“环”的所有顶点坐标,作为一个多点几何体赋值给geometry
              return new MultiPoint( feature.getGeometry().getCoordinates()[0]);
            }
          })
        ];

        this.map = new Map({
          target: 'map',
          view: new View({
            center: [0,0],
            zoom: 1
          }),
          layers:[
            new VectorLayer({
              source: new VectorSource({
                features: (new GeoJSON()).readFeatures(this.geojsonObject)
              }),
              style,
            })
          ]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>