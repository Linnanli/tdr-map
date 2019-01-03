const path = require('path')
const { getIp } = require('../build/util') // 引入获取本机局域网内ip地址方法

// dist文件夹地址
let distPath = path.resolve(__dirname, '../dist')

let config = {
    build:{
        main: './src/index.js', // 源码入口
        assetsRoot: distPath,//生产包将会被打包到/dist目录中
        devtool: 'source-map' // 生成source-map文件，它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。
    },
    dev:{
        main: './example/src/index.js', // 调试demo代码入口
        assetsRoot: distPath, //开发包将会被打包到/dist目录中
        assetsSubDirectory:'',//静态资源存放目录
        assetsPublicPath:'/', // 公用基础路径，类似于html的base标签
        devtool:'eval-source-map',
        host: getIp(), // WebpackDevServer 启动的IP地址
        port: 8092 // WebpackDevServer 启动的端口号
    }
}

module.exports = config