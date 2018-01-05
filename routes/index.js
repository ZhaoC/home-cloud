var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function (req, res, next) {
  // res.sendFile(path.join(__dirname+'/../index.html'));
  res.render('index', {
    title: 'Express'
  });
});
 
router.get('/photo', function (req, res, next) {
  var targetDir = path.join(__dirname + '/../public/photo');
  fs.readdir(targetDir, (err, items) => {
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
 
    res.render('file', {
      title: 'Photo',
      files: items
    });
  });
});

router.get('/video', function (req, res, next) {
  var targetDir = path.join(__dirname + '/../public/video');
  fs.readdir(targetDir, (err, items) => {
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
 
    res.render('file', {
      title: 'Video',
      files: items
    });
  });
});

module.exports = router;
