<template>
    <div style="height: 100vh">
        <div>
            <el-button size="small" @click="zoomMap('big')">放大</el-button>
            <el-button size="small" @click="zoomMap('small')">缩小</el-button>
        </div>
        <div id="map" ref="map"></div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import {Map,View,} from 'ol'
    import TileLayer from 'ol/layer/Tile'
    import {OSM} from 'ol/source'
    import {defaults} from 'ol/interaction'
    export default {
        name: "ControlMap",
        data(){
            return{
                map: null,
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.initMap().then(()=>{
                    console.log(this.map)
                    this.map.on('moveend',()=>{
                        console.log(this.map.getView().getZoom())
                    })
                })
               /* this.initMap(()=>{
                    this.map('on',()=>{
                        console.log(this.map.getView().getZoom())
                    })
                })*/
            })
        },
        methods:{
            initMap(){
                return new Promise(resolve=>{
                    this.map = new Map({
                        target:'map',
                        layers:[
                            new TileLayer({
                                source: new OSM()
                            })
                        ],
                        view: new View({
                            center:[0,0],
                            zoom:2,
                        }),
                        interactions: defaults(({
                            onFocusOnly: true,
                        }))
                    })
                    resolve();
                })

            },
            zoomMap(flag){
                let view = this.map.getView();
                let zoom = view.getZoom();
                flag === 'big' && view.setZoom(zoom + 1);
                flag === 'small' && view.setZoom(zoom - 1);
            },
        }
    }
</script>

<style scoped>
#map{
    width: 100%;
    height: calc(100% - 100px);
}
</style>