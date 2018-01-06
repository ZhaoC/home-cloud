var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

function retrieveFiles(req, res, tag, title){
  var targetDir = path.join(__dirname + '/../public/'+ tag);
  fs.readdir(targetDir, (err, items) => {
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }

    res.render('file', {
      tag: tag,
      title: title,
      files: items
    });
  });
};

router.get('/', function (req, res, next) {
  // res.sendFile(path.join(__dirname+'/../index.html'));
  res.render('index', {
    title: 'Home Cloud'
  });
});
 
router.get('/photo', function (req, res, next) {
  retrieveFiles(req, res, 'photo', 'Photo');
});

router.get('/video', function (req, res, next) {
  retrieveFiles(req, res, 'video', 'Video');
});

router.get('/audio', function (req, res, next) {
  retrieveFiles(req, res, 'audio', 'Audio');
});

router.get('/doc', function (req, res, next) {
  retrieveFiles(req, res, 'doc', 'Doc');
});

router.get('/other', function (req, res, next) {
  retrieveFiles(req, res, 'other', 'Other');
});


module.exports = router;
