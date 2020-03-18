import TileLayer from "ol/layer/Tile";
import TileArcGISRest from "ol/source/TileArcGISRest";
import OSM from 'ol/source/OSM';
import XYZ from "ol/source/XYZ";
let maptype = 1;  // 0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务
let street_map = ()=> {
    let map_layer = null;
    switch (maptype) {
        case 0:
            map_layer = new TileLayer({
                source: new XYZ({
                    url: 'http://127.0.0.1:7080/streetmap/shenzhen/{z}/{x}/{y}.jpg'
                })
            });
            break;
        case 1:
            map_layer = new TileLayer({
                source: new OSM()
            });
            break;
        case 2:
            map_layer = new TileLayer({
                source: new TileArcGISRest({
                    url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                })
            });
        break;
    }
    return [map_layer]
};
export default  {
    center:[0,0],
    zoom:1,          //地图缩放级别
    street_map
};
