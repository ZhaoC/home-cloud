var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var util = require('util');

var requestMW = require('../util/requestMiddleware');
const readdirAsync = util.promisify(fs.readdir);

var photoRegExp = /\.(jpg|jpeg|png|gif)$/;
var videoRegExp = /\.(mp4|mkv|webm)$/;
var audioRegExp = /\.(mp3|ogg)$/;
var docRegExp = /\.(pdf|json|xml|txt|doc|docx|md|css|js)$/;
// var otherRegExp = /\.(iso|zip|jar|rar|apk|dmg|exe)$/;
var otherRegExp = /[a-zA-Z0-9]$/;

async function retrieveFiles(req, res, tag, title, regExp){
  // var targetDir = path.join(__dirname + '/../public/'+ tag);
  var targetDir = './public/'+title+'/';

  try{
    //check is IP is valid
    var userCanDelete = await requestMW.checkIPAuthorized(req, 'delete');
    console.log(userCanDelete ? 'User can delete.' : 'User cannot delete.');
    var items = await readdirAsync(targetDir);

    console.log(items);
    var filteredItems = [];
    if(items !== undefined){
      for (var i = 0; i < items.length; i++) {
        let item = items[i];      
        if(items[i].match(regExp)){
          filteredItems.push(item);
          console.log('approved: ', item);
        }
      }
    }   

    res.render('file', {
      tag: tag,
      title: title,
      files: filteredItems,
      userCanDelete: userCanDelete
    });
  } catch(e){
    console.log(e);
  }
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
