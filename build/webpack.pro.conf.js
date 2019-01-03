const merge = require('webpack-merge')
const webpack = require('webpack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackCommon = require('./webpack.common')
const ora = require('ora')
const chalk = require('chalk')

//设置全局环境变量
const env = require('../config/prod.env')
process.env.NODE_ENV = env.NODE_ENV
//引入构建生产文件配置
const config = require('../config').build

// 合并公用配置和构建生产文件配置
const webpackConfig = merge(webpackCommon, {
    entry: {
        main: config.main // src目录下的源码入口地址
    },
    output: {
        path: config.assetsRoot,// 生产打包后的存放的目录
        filename: '[name].min.js', // 生产打包后的文件名称
        library: {
            root: "TdrMap", // 在window对象中如何调用，如：window.TdrMap
            amd: "tdr-map", // 在amd规范下使用'tdr-map名称引用', 如：require(['webpackNumbers'], function(){})
            commonjs: "tdr-map" // 在commonjs规范下使用'tdr-map名称引用',如 var TdrMap = require('tdr-map')
        },
        libraryTarget: 'umd', // 将你的 library 暴露为所有的模块定义下都可运行的方式
        libraryExport: "default" // 如果使用export default导出模块的话，配置为'default'
    },
    devtool: config.devtool,
    plugins: [
        // 定义环境变量，在自定义的插件脚本中可以获取到
        new webpack.DefinePlugin({
            'process.env': env
        }),
        //如果你引入一个新的模块，会导致 module id 整体发生改变，可能会导致所有文件的chunkhash发生变化
        //HashedModuleIdsPlugin根据模块的相对路径生成一个四位数的hash作为模块id，这样就算引入了新的模块，也不会影响 module id 的值
        new webpack.HashedModuleIdsPlugin(),
        new ParallelUglifyPlugin({
            // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果返回
            // cacheDir 用于配置缓存存放的目录路径
            cacheDir: 'node_modules/.uglify-cache',
            sourceMap: true,
            output: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false
            },
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),//作用域提升 (scope hoisting)
        // 查看 webpack 打包后所有组件与组件间的依赖关系,可以针对性的对过大的包进行优化
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1', // 分析界面的启动url地址
            analyzerPort: 8888,
            openAnalyzer: false
        })
    ]
})

// 构建中的提示信息
const spinner = ora('生产文件构建中...').start()
spinner.color = 'green'

// 开始打包构建生产文件并对打包完成对最终信息进行显示
webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  构建失败,出现错误.\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('  构建完成.\n'))
    console.log(chalk.yellow(
        '  Tip: 生产文件存放在dist目录下.\n'
    ))
})