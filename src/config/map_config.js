import TileLayer from "ol/layer/Tile";
import TileArcGISRest from "ol/source/TileArcGISRest";
import { OSM,BingMaps,XYZ,Stamen } from 'ol/source'
//图层 maptype [number] 图层类型
let street_map = (maptype)=> {
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
            map_layer = new TileLayer({
                source: new OSM()
            });
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
    }
    return [map_layer]
};
export default  {
    center:[104.06,30.67],
    zoom:10,          //地图缩放级别
    street_map
};
