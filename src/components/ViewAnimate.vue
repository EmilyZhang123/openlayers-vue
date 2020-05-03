<template>
  <div>
    <el-button size="small" @click="handleCommand(1)">顺时针旋转</el-button>
    <el-button size="small" @click="handleCommand(2)">逆时针旋转</el-button>
    <el-button size="small" @click="handleCommand(3)">绕着北京旋转</el-button>
    <el-button size="small" @click="handleCommand(4)">平移到上海</el-button>
    <el-button size="small" @click="handleCommand(5)">旋转到上海</el-button>
    <hr>
    <div id="map"></div>
  </div>
</template>

<script>
  import { Map, View } from 'ol'
  import { fromLonLat } from 'ol/proj'
  import TileLayer from 'ol/layer/Tile'
  import { OSM } from 'ol/source'
  import { easeIn, easeOut } from 'ol/easing'
  export default {
    name: "ViewAnimate",
    data(){
      return {
        map:null,
        view:null,
        beijing: fromLonLat([116.432934,39.910924]), // 将北京火车站的经纬度坐标转换成ESPG:3857经纬度坐标
        shanghai: fromLonLat([121.672562,31.140039]), // 上海迪士尼
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initMap()
      })
    },
    methods:{
      initMap(){
        this.view = new View({
          center: this.beijing,
          zoom:5,
        });
        this.map = new Map({
          target:'map',
          loadTilesWhileAnimating: true, // 动画过渡时允许加载瓦片
          view: this.view,
          layers:[
            new TileLayer({
              preload:5,
              source: new OSM(),
            })
          ]
        })
      },
      handleCommand(num){
        // this.view.getRotation()  获取当前旋转角度
        let nowRotation = this.view.getRotation();
        if(num === 1) {
          this.view.animate({
            rotation: nowRotation + Math.PI/2
          })
        }
        if(num === 2) {
          this.view.animate({
            rotation: nowRotation - Math.PI/2
          })
        }
        if(num === 3) {
          this.view.animate(
            // 动画同时进行
            {
              rotation: nowRotation + Math.PI,
              anchor: this.beijing,
              easing: easeIn
            },
            {
              rotation: nowRotation + 2*Math.PI,
              anchor: this.beijing,
              easing: easeOut
            }
          )
        }
        if (num === 4){
          this.view.animate({
            center: this.shanghai,
            duration: 5000,
            // 弹跳
           easing:t => Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1
        /*    easing: t => {
              let s = 7.5625;
              let p = 2.75;
              let l;
              if (t < (1 / p)) {
                l = s * t * t;
              } else {
                if (t < (2 / p)) {
                  t -= (1.5 / p);
                  l = s * t * t + 0.75;
                } else {
                  if (t < (2.5 / p)) {
                    t -= (2.25 / p);
                    l = s * t * t + 0.9375;
                  } else {
                    t -= (2.625 / p);
                    l = s * t * t + 0.984375;
                  }
                }
              }
              return l;
            }*/
          })
        }
        if (num === 5){
          let center  = this.view.getCenter();
          this.view.animate(
            {
              center:[
                center[0] + this.shanghai[0] - center[0]/2,
                center[1] + this.shanghai[1] - center[1]/2
              ],
              rotation: Math.PI,
              easing: easeIn
            },
            {
              center: this.shanghai,
              rotation: 2*Math.PI,
              easing: easeOut
            }
          )
        }
      }
    }
  }
</script>

<style scoped>

</style>