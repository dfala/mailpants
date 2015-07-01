var Tokens = require('./keys.js');

var AWS = require('aws-sdk');
// Hard amazon aws config
AWS.config.update({
	  accessKeyId: Tokens.amazonAccess
	, secretAccessKey: Tokens.amazonSecret
	, region: Tokens.amazonRegion
});

var s3 = new AWS.S3(); 
var keys = require('./keys.js');

var exports = module.exports = {};

exports.getObject = function (req, res) {
	
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