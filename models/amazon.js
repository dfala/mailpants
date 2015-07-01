var Tokens = require('./keys.js');

var AWS = require('aws-sdk');
// Had amazon aws config
AWS.config.update({
	  accessKeyId: Tokens.amazonAccess
	, secretAccessKey: Tokens.amazonSecret
	, region: Tokens.amazonRegion
});

var s3 = new AWS.S3(); 
var keys = require('./keys.js');

var exports = module.exports = {};

exports.getObject = function () {
	//Key below refers to imageName.jpg
	var params = {Bucket: 'mailpants', Key: "Profile Picture.png"};

	// Get image --> returns buffer
	s3.getObject(params, function(err, data) {
		if (err) return console.log(err);
		return console.log("Success...?!", data);
	});


	// Get list of buckets
	// s3.listBuckets(function(err, data) {
	//   if (err) { console.log("Error:", err); }
	//   else {
	//     for (var index in data.Buckets) {
	//       var bucket = data.Buckets[index];
	//       console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
	//     }
	//   }
	// });

}