const pkg = require('../package.json') // 引入package.json文件

// 定义环境变量和版本号
// 1. 可以使用process.env.NODE_ENV语句区分是开发环境还是生产环境
// 2. 可以使用process.env.VERSION获取当前插件版本号
module.exports = {
    VERSION: JSON.stringify(pkg.version),
    NODE_ENV: JSON.stringify('production')
}
