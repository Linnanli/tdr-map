const path = require('path')

let srcPath = path.resolve(__dirname, '../src') // 源码文件夹路径

module.exports = {
    context: path.resolve(__dirname, '../'), // 基础目录，用以解析entry入口路径
    resolve: {
        extensions: ['.js'], // 自动添加拓展名，如：import './a'，会自动解析为import './a.js'
        alias: {
            'tdr-map': srcPath // 定义源码文件夹路径的别名，如：import '@'，会解析为 import 'X:xx/xx/src'
        }
    },
    module: {
        rules: [ // babel-loader,将es6转换成es5
            {
                test: /\.js$/,
                include: [srcPath, path.resolve(__dirname, '../example')],
                loader: 'babel-loader'
            }
        ]
    }
}