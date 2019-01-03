const merge = require('webpack-merge') // 引入webpack合并工具
const prodEnv = require('./prod.env') // 引入生产环境的环境变量配置

// 合并prod.env和dev.env的配置
module.exports = merge(prodEnv,{
    NODE_ENV: JSON.stringify('development')
})