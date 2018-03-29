var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var moment = require('moment');

var maxSize = 1 * 1000 * 1000;

function getStorage(path) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/' + path + '/')
        },
        filename: function (req, file, cb) {
            // console.log('moment', moment().format("YYYYMMDDHHmmss"));
            cb(null, moment().format("YYYYMMDDHHmmss")+'-'+file.originalname)
        }
    });
}

var uploadPhoto = multer({
    storage: getStorage('Photo')
});

var uploadAudio = multer({
    storage: getStorage('Audio')
});

var uploadVideo = multer({
    storage: getStorage('Video')
});

var uploadDoc = multer({
    storage: getStorage('Doc')
});

var uploadOther = multer({
    storage: getStorage('Other')
});

let returnSuccess = { status: 'success'};

/** this will upload a signle file */
// router.post('/photo', uploadPhoto.single('fileupload'), function (req, res) {
//     res.send(JSON.stringify(returnSuccess));
// });

router.post('/photo', uploadPhoto.any(), function (req, res) {
    res.send(JSON.stringify(returnSuccess));
});

router.post('/audio', uploadAudio.any(), function (req, res) {
    res.send(JSON.stringify(returnSuccess));
});

router.post('/video', uploadVideo.any(), function (req, res) {
    res.send(JSON.stringify(returnSuccess));
});

router.post('/doc', uploadDoc.any(), function (req, res) {
    res.send(JSON.stringify(returnSuccess));
});

router.post('/other', uploadOther.any(), function (req, res) {
    res.send(JSON.stringify(returnSuccess));
});

module.exports = router;