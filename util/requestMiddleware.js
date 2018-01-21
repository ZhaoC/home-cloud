var fs = require('fs');
var util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const existsAsync = util.promisify(fs.exists);
const unlinkAsync = util.promisify(fs.unlink);

const returnSuccess = {
    status: 'success'
};
var returnRejected = {
    status: 'rejected'
};
const returnFailed = {
    status: 'failed'
};

const uploadRequestFilterMW = async(req, res, next) => {
    try {
        let isIPAuthorized = await checkIPAuthorized(req, 'upload');

        console.log('isIPAuthorized: ' + (isIPAuthorized ? 'true' : 'false'));

        if (isIPAuthorized) {
            next();
        } else {
            res.send(JSON.stringify(returnRejected));
            return;
        }
    } catch (e) {
        res.send(JSON.stringify(returnFailed));
    }
};

const removeFileMW = async(req, res, next) => {
    let requestData = req.body;
    let filePath = './public' + requestData.filePath;
    let isFileExists = await existsAsync(filePath);
    let retVal = {};
    if (isFileExists) {
        try {
            await unlinkAsync(filePath);
            console.log(`*** File ${filePath} deleted successfully!`);
            retVal = returnSuccess;
        } catch (e) {
            console.log('error', e);
            retVal = returnFailed;
        }
    } else {
        console.log(`*** File ${filePath} not found!`);
        retVal = returnFailed;
    }
    res.send(JSON.stringify(retVal));
}

function retrieveIP(req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    } else if (ip.substr(0, 3) == "::1") {
        ip = ip.substr(3);
    }
    console.log('retrieveIP: ' + ip);
    return ip;
}

const checkIPAuthorized = async(req, category) => {
    let jsonString = await readFileAsync('whitelist.json', 'utf8'),
        isIPAuthorized = false,
        ip = retrieveIP(req),
        ipWhitelist = {},
        obj = JSON.parse(jsonString);

    console.log('obj', obj);

    if (category === 'upload') {
        ipWhitelist.ips = [...obj.canUpload];
    } else if (category == 'delete') {
        ipWhitelist.ips = [...obj.canDelete];
    }

    console.log('list.ip: ', ipWhitelist.ips);

    if (ipWhitelist.ips.includes(ip) || ipWhitelist.ips.includes('*')) {
        isIPAuthorized = true;
    } else {
        isIPAuthorized = false;
    }

    return isIPAuthorized;
}

module.exports = {
    uploadRequestFilterMW: uploadRequestFilterMW,
    removeFileMW: removeFileMW,
    retrieveIP: retrieveIP,
    checkIPAuthorized: checkIPAuthorized
};