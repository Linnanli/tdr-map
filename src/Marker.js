// 私有方法名称
const _init = Symbol('_init')

/**
 * @class 地图覆盖物类, 挂载到Map类的静态方法中
 * @param { Map } map 地图实例化对象
 * @returns { Marker } 返回地图覆盖物的实例化对象
 */
export default class Marker{
    constructor(map){
        console.log(`传入Marker的参数：地图对象：${map}`)
        this[_init]()
    }

    [_init](){
        console.log('初始化marker对象')
    }
}