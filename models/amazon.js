var Tokens = require('./keys.js');
var AWS = require('aws-sdk');
var User = require('./User.js');

// Hard amazon aws config
AWS.config.update({
	  accessKeyId: Tokens.amazonAccess
	, secretAccessKey: Tokens.amazonSecret
	, region: Tokens.amazonRegion
});

var keys = require('./keys.js');
var s3 = new AWS.S3();

var exports = module.exports = {};

exports.createFolder = function (req, res, result) {
	var bucketFolder = 'mailpants/' + req.body.email;

	var params = { Bucket: 'mailpants', Folder: req.body.email, ACL: 'public-read' };
    
    // s3.upload(params, function (err, data) {
    s3.createBucket( params, function (err, data) {
        if (err) return console.log(err);
        console.log('data', data);
        return res.json(result);
    });
}


exports.getImage = function (req, res) {
	var imageKey = req.params.imageKey;
	
	//Key below refers to imageName.jpg
	// var params = {Bucket: 'mailpants', Key: "Profile Picture.png"};
	var params = {Bucket: 'mailpants', Key: imageKey};

	// Get image --> returns buffer
	s3.getObject(params, function(err, data) {
		if (err) return res.status(500).send(err);
		
		var respond = data;
		respond.Body = respond.Body.toString('base64');
		return res.send(respond);
	});
}


exports.saveImage = function (req, res) {
	buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

	var bucketName = 'mailpants/' + req.body.userEmail;
	var params = {
		  Bucket: bucketName
		, Key: req.body.imageName
		, Body: buf
		, ContentType: 'image/' + req.body.imageExtension
		, ACL: 'public-read'
	};

    s3.upload(params, function (err, data) {
      if (err) return res.status(500).send(err);
      
      // Add list link to user.images
      var query  = User.where({ email: req.body.userEmail });
	  query.findOne(function (err, activeUser) {
      	if (err) return console.log(err);
      	data.imgPath = bucketName;

      	activeUser.images.push(data);
      	activeUser.save(function (err, result) {
      		if (err) return console.log(err);
      		return res.send(data);
      	})
      })
    });
}









