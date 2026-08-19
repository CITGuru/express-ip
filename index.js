var geoip = require('geoip-lite');

module.exports = function () {
    var getIpInfo = function (ip) {
        // IPV6 addresses can include IPV4 addresses
        // So req.ip can be '::ffff:86.3.182.58'
        // However geoip-lite returns null for these
        if (ip.includes('::ffff:')) {
            ip = ip.split(':').reverse()[0]
        }
        // Loopback (localhost) addresses have no geolocation data, so
        // return a meaningful message instead of a generic lookup error
        if (/^127\./.test(ip) || ip === '::1' || ip === '0:0:0:0:0:0:0:1') {
            return { error: "This won't work on localhost" }
        }
        var lookedUpIP = geoip.lookup(ip);
        if (!lookedUpIP) {
            return { error: "Error occured while trying to process the information" }
        }
        return lookedUpIP;
    }

    var getIpInfoMiddleware = function (req, res, next) {
        var xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        var ip = xForwardedFor || req.connection.remoteAddress;
        req.ipInfo = { ip, ...getIpInfo(ip) };
        next();
    }

    return {
        getIpInfoMiddleware,
        getIpInfo,
    }
}
