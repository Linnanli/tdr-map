// 获取本机局域网内ip地址
exports.getIp = () => {
    let os = require('os'),
        iptable = {},
        ifaces = os.networkInterfaces()
    for (let dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if (details.family == 'IPv4') {
                iptable[dev + (alias ? ':' + alias : '')] = details.address
            }
        })
    }

    for (let key in iptable) {
        return iptable[key]
    }
}