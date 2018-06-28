var geoip = require('geoip-lite');

module.exports = function () {
    var getIpInfo = function (ip) {
        // IPV6 addresses can include IPV4 addresses
        // So req.ip can be '::ffff:86.3.182.58'
        // However geoip-lite returns null for these
        if (ip.includes('::ffff:')) {
            ip = ip.split(':').reverse()[0]
        }
        var lookedUpIP = geoip.lookup(ip);
        if ((ip === '127.0.0.1')) {
            return {error:"This won't work on localhost"}
        }
        if (!lookedUpIP){
            return { error: "Error occured while trying to process the information" }
        }
        return lookedUpIP;
    }

    var getIpInfoMiddleware = function (req, res, next) {
        var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        var ip = xForwardedFor || req.connection.remoteAddress;
        req.ipInfo = getIpInfo(ip);
        next();
    }

    return {
        getIpInfoMiddleware,
        getIpInfo,
    }
}