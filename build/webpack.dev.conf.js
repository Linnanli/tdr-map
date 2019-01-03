const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const WebpackDevServer = require("webpack-dev-server")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//设置全局环境变量
const env = require('../config/dev.env')
process.env.NODE_ENV = env.NODE_ENV
//引入公用配置文件
const webpackCommon = require('./webpack.common')
// 引入开发环境配置参数
const config = require('../config').dev

// 合并开发环境webpack配置和公用配置
let webpackDev = merge(webpackCommon, {
    entry: {
        main: config.main // 定义调试demo代码入口
    },
    output: {
        path: config.assetsRoot, // 内存中映射地址
        filename: path.join(config.assetsSubDirectory, 'js/[name].js'), // 入口文件的文件名称
        chunkFilename: path.join(config.assetsSubDirectory, 'js/[name].js'),// 分包加载脚本的文件名称
        publicPath: config.assetsPublicPath
    },
    devtool: config.devtool, // 生成source-map
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 10,
                    name: path.join(config.assetsSubDirectory, 'img/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        // 定义环境变量，在自定义的插件脚本中可以获取到
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 启动开发环境时，提示更友好
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.host}:${config.port}`],
            }
        }),
        // 定义入口html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, `../example/index.html`),
            inject: true
        })
    ]
})

let compiler = webpack(webpackDev)

let server = new WebpackDevServer(compiler, {
    quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台
    host: config.host, // server的ip地址
    port: config.port// server的端口号
})

server.listen(config.port, config.host, function () {
    // 启动中的提示
    console.log('> Starting dev server...')
})
