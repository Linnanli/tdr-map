import MarkerConstructor from './Marker'
import { addVersion } from './decorator'
import Marker from './Marker'

// 私有方法名称
const _init = Symbol('_init')

/**
 * @class 兼容三网地图类
 * @param { DOM } ele - 传入DOM对象
 * @returns { Map } 返回地图的实例化对象
 */
@addVersion()
export default class Map {
    ele
    map = null
    constructor(ele) {
        this.ele = ele
        this[_init]()
    }

    /**
     * 初始化地图对象的方法
     * @private
     */
    [_init]() {
        // 创建Map实例
        this.map = new BMap.Map(this.ele)
        console.log('初始化map对象')
    }

    /**
     * 设置地图中心经纬度和层级
     * @public
     * @param {float} lon 经度
     * @param {float} lat 纬度
     * @param {int} zoom 地图层级
     */
    centerAndZoom(lon = 116.404, lat = 39.915, zoom = 11){
        this.map.centerAndZoom(new BMap.Point(lon, lat), zoom);  // 初始化地图,设置中心点坐标和地图级别
    }

    /**
     * 地图覆盖物的静态方法Marker
     * @static
     * @public
     * @param  {argument} arg 所有的参数数组集合
     * @returns { Marker } marker对象
     */
    static Marker(...arg){
        return new MarkerConstructor(...arg)
    }
}