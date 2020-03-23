<template>
    <div>
        <div id="map" ref="rootmap"></div>
        <div id="map1" ref="rootmap1"></div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import { Map,View} from 'ol';
    import map_config from '../config/map_config'
    export default {
        name: "olmap",
        data(){
            return {
                map:null,
                map1:null,
            }
        },
        mounted() {
            this.$nextTick(()=>{
                let view = new View({
                    projection: "EPSG:4326",
                    extent: [102, 29, 104, 31], // 设置地图的中心范围
                    center:map_config.center, // 定义地图显示中心的经纬度
                    zoom:map_config.zoom, // 定义地图的缩放
                    //限制地图缩放级别
                    minZoom:5,
                    maxZoom:11
                }) // 设置地图的视图
                // 创建地图
                this.map = new Map({
                    target: this.$refs.rootmap, // 设置地图的容器
                    // logo: {src:'../assets/logo.png'},
                    layers:map_config.street_map(5), // 设置地图图层
                    view: view
                })
              /*  this.map1 = new Map({
                    target: this.$refs.rootmap1, // 设置地图的容器
                    // logo: {src:'../assets/logo.png'},
                    layers:map_config.street_map(), // 设置地图图层
                    view:view
                 })*/
             })
        }
    }
</script>

<style scoped>
    #map,#map1{
        height:500px;
        width: 1000px;
    }
    /*隐藏ol的一些自带元素*/
    .ol-attribution,.ol-zoom { display: none;}
</style>
