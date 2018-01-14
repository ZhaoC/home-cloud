var fs = require('fs');

var self = module.exports = {
    checkReuqestIP: function (path, req, res, cb) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) throw err;
            var ret = false;
            var obj = JSON.parse(data);
            var ipList = obj.whitelist;
            var ip = self.retrieveIP(req);

            console.log('listArr: ', ipList);
            if (ipList.includes(ip)) {
                ret = true;
            } else {
                ret = false;
            }

            console.log('ret: '+ (ret? 'true': 'false'));

            if(ret){
                cb();
            } else{
                var returnRejected = { status: 'rejected'};
                // console.log('json data: '+JSON.stringify(returnRejected));
                return res.send(JSON.stringify(returnRejected));
            }
        });
    },

    retrieveIP: function (req) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        } else if (ip.substr(0, 3) == "::1") {
            ip = ip.substr(3);
        }
        console.log('retrieveIP: '+ip);
        return ip;
    }

};