<template>
    <div id="map" ref="rootmap"></div>
</template>

<script>
    import 'ol/ol.css'
    import { Map,View} from 'ol';
    import mapconfig from '../config/map_config'
    export default {
        name: "olmap",
        data(){
            return {
                map:null
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.map = new Map({
                    target: this.$refs.rootmap,
                    layers:mapconfig.streetmap(),
                    view: new View({
                        projection: "EPSG:4326",
                        center: [mapconfig.x,mapconfig.y],
                        zoom:mapconfig.zoom
                    })
                })
            })
        }
    }
</script>

<style scoped>
    #map{height:100%;}
    /*隐藏ol的一些自带元素*/
    .ol-attribution,.ol-zoom { display: none;}
</style>
