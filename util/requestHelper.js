var fs = require('fs');
var util = require('util');

const readFile = util.promisify(fs.readFile);

const uploadRequestFilterMW = async(req, res, next) => {
    try {
        const data = await readFile('whitelist.json', 'utf8');
        var isIPAuthorized = false,
            obj = JSON.parse(data),
            ipList = obj.whitelist,
            ip = retrieveIP(req);
        console.log('listArr: ', ipList);

        if (ipList.includes(ip) || ipList.includes('*')) {
            isIPAuthorized = true;
        } else {
            isIPAuthorized = false;
        }

        console.log('isIPAuthorized: ' + (isIPAuthorized ? 'true' : 'false'));

        if (isIPAuthorized) {
            next();
        } else {
            var requestRejected = {
                status: 'rejected'
            };
            res.send(JSON.stringify(requestRejected));
            return;
        }
    } catch (e) {
        var requestFailed = {
            status: 'failed'
        };
        res.send(JSON.stringify(requestFailed));
    }
};

function retrieveIP(req) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    } else if (ip.substr(0, 3) == "::1") {
        ip = ip.substr(3);
    }
    console.log('retrieveIP: ' + ip);
    return ip;
}

module.exports = {
    uploadRequestFilterMW: uploadRequestFilterMW,
    retrieveIP: retrieveIP
};