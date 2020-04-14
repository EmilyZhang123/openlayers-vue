import TileLayer from "ol/layer/Tile"
import 'ol/ol.js'
// import ol from 'ol'
import {TileArcGISRest,TileDebug} from "ol/source"
import TileGrid from 'ol/tilegrid/TileGrid'
import { transform } from 'ol/proj'
import { OSM,BingMaps,XYZ,Stamen,TileImage } from 'ol/source'
import {View} from "ol";
//图层 maptype [number] 图层类型
let street_map = maptype => {
    let map_layer = null;
    switch (maptype) {
        // 0表示部署的离线瓦片地图
        case 0:
            map_layer = new TileLayer({
                source: new XYZ({
                    // url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', // open street map
                    // url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', // 高德
                    url: 'https://{0-3}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?lg=ENG&ppi=250&token=TrLJuXVK62IQk0vuXFzaig%3D%3D&requestid=yahoo.prod&app_id=eAdkWGYRoc4RfxVo0Z4B', // 雅虎
                })
            });
            break;
        // Open Street Map地图层
        case 1:
            map_layer = [
                new TileLayer({
                    source: new OSM()
                }),
               /* new TileLayer({
                    source: new  TileDebug({
                        projection: 'EPSG:3857',
                        tileGrid: new OSM().getTileGrid()
                    })
                }),*/
            ];
            break;
        // 表示使用Arcgis在线午夜蓝地图服务
        case 2:
            map_layer = new TileLayer({
                source: new TileArcGISRest({
                    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                })
            });
        break;
        // Bing地图
        case 3:
            map_layer = new TileLayer({
                source: new BingMaps({
                    key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
                    imagerySet: 'Road'
                })
            })
            break;
        // Stamen
        case 4:
            map_layer = new TileLayer({
                source: new  Stamen({
                    layer: 'watercolor'
                })
            })
            break;
        // 百度地图
        case 5:
            map_layer = new TileLayer({
                source: new XYZ({
                    getTilePixelRatio:2,
                    tileUrlFunction: tileCoord =>{
                        // tileCoord为瓦片坐标
                        let [z,x,y] = tileCoord;
                        let halfTileNum = Math.pow(2,z-1); // 计算当前层级下瓦片总数的一半，用于定位整个地图的中心点
                        // 原点移到中心点后，计算xy方向上新的坐标位置
                        let baiduX = x - halfTileNum;
                        let baiduY = y + halfTileNum;
                        // 百度瓦片服务url将负数使用M前缀来标识
                        if (baiduX < 0){
                            baiduX = 'M' + (-baiduX);
                        }
                        if (baiduY < 0){
                            baiduY = 'M' + (-baiduY)
                        }
                        return 'http://online2.map.bdimg.com/onlinelabel/?qt=tile&x=' + baiduX + '&y=' + baiduY + '&z=' + z + '&styles=pl&udt=20160321&scaler=2&p=0';
                    }
                })
            })
            break;
        case 6: {
            let resolutions = [];
            let maxZoom = 18;
            for (let i = 0; i <= maxZoom; i++){
                resolutions[i] = Math.pow(2,maxZoom - 1)
            }
            map_layer = new TileLayer({
                source: new TileImage({
                    projection: 'EPSG:3857',
                    tileGrid: new TileGrid({
                        origin: [0,0],
                        resolutions:resolutions,
                    }),
                    tileUrlFunction:(tileCoord)=>{
                        let [x,y,z] = tileCoord;
                        if (x < 0){
                            x = 'M' + (-x);
                        }
                        if (y < 0){
                            y = 'M' + (-y)
                        }
                        return "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20160426&scaler=1&p=0";
                    }
                })
            })
        }


    }
    return Array.isArray(map_layer)? map_layer : [map_layer]
};
export default  {
    layers: street_map(1),
    view: new View({
        projection: "EPSG:4326",
        // extent: [102, 29, 104, 31], // 设置地图的中心范围
        // center: transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857'), // 定义地图显示中心的经纬度
        center: [104,30],
        zoom: 10, // 定义地图的缩放
        //限制地图缩放级别
        minZoom: 1,
        maxZoom: 20
    }) // 设置地图的视图
};
