import '../styles/index.sass' // 样式文件
import TdrMap from 'tdr-map'

    // 应用入口
; (function main() {
    console.log(`当前环境：${process.env.NODE_ENV}`)
    const map = new TdrMap(document.getElementById('map-contain'))
    map.centerAndZoom(116.404, 39.915, 11)
    console.log(map)
})();