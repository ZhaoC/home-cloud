var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var maxSize = 1 * 1000 * 1000;

function getStorage(path) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/' + path + '/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now()+'-'+file.originalname)
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

router.post('/photo', uploadPhoto.single('imageupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

router.post('/audio', uploadAudio.single('audioupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

router.post('/video', uploadVideo.single('videoupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

router.post('/doc', uploadDoc.single('docupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

router.post('/other', uploadOther.single('otherupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

module.exports = router;