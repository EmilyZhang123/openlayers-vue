<template>
    <div id="map" ref="rootmap"></div>
</template>

<script>
    import 'ol/ol.css'
    import { Map,View} from 'ol';
    import TileLayer from 'ol/layer/Tile'
    import OSM from  'ol/source/OSM'
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
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        })
                    ],
                    view: new View({
                        projection: "EPSG:4326",
                        center: [114.064839,22.548857],
                        zoom:12
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
