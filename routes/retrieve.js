var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var photoRegExp = /\.(jpg|jpeg|png|gif)$/;
var videoRegExp = /\.(mp4|mkv|webm)$/;
var audioRegExp = /\.(mp3|ogg)$/;
var docRegExp = /\.(pdf|json|xml|txt|doc|docx|md|css|js)$/;
var otherRegExp = /\.(iso|zip|jar|rar|apk|dmg|exe)$/;

function retrieveFiles(req, res, tag, title, regExp){
  var targetDir = path.join(__dirname + '/../public/'+ tag);
  fs.readdir(targetDir, (err, items) => {
    console.log(items);
    var filteredItems = [];
    for (var i = 0; i < items.length; i++) {
      let item = items[i];      
      if(items[i].match(regExp)){
        filteredItems.push(item);
        console.log('approved: ', item);
      }
    }

    res.render('file', {
      tag: tag,
      title: title,
      files: filteredItems
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
  retrieveFiles(req, res, 'photo', 'Photo', photoRegExp);
});

router.get('/video', function (req, res, next) {
  retrieveFiles(req, res, 'video', 'Video', videoRegExp);
});

router.get('/audio', function (req, res, next) {
  retrieveFiles(req, res, 'audio', 'Audio', audioRegExp);
});

router.get('/doc', function (req, res, next) {
  retrieveFiles(req, res, 'doc', 'Doc', docRegExp);
});

router.get('/other', function (req, res, next) {
  retrieveFiles(req, res, 'other', 'Other', otherRegExp);
});


module.exports = router;
