<template>
    <div>
        <div>当前层级：{{zoom}},分辨率：{{resolution}}</div>
        <div id="map" ref="rootmap"></div>
        <div id="map1" ref="rootmap1"></div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import { Map} from 'ol';
    import map_config from '../config/map_config'
    export default {
        name: "olmap",
        data(){
            return {
                map:null,
                map1:null,
                zoom:0,
                resolution:''
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.initMap();
            })
        },
        methods: {
            initMap() {
                // 创建地图
                this.map = new Map({
                    target: this.$refs.rootmap, // 设置地图的容器
                    // logo: {src:'../assets/logo.png'},
                    ...map_config
                });
                this.map.getView().on('change:resolution',()=>{
                    this.zoom = this.map.getView().getZoom();
                    this.resolution = this.map.getView().getResolution();
                })
                this.zoom = this.map.getView().getZoom();
                this.resolution = this.map.getView().getResolution();
                /*  this.map1 = new Map({
                          target: this.$refs.rootmap1, // 设置地图的容器
                          // logo: {src:'../assets/logo.png'},
                          layers:map_config.street_map(), // 设置地图图层
                          view:view
                       })*/
            }
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
