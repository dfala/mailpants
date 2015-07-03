var exports = module.exports = {};

// Dependencies
var Amazon = require('../models/amazon.js');

// Heavy lifting
exports.getImage = function (req, res) {
	Amazon.getImage(req, res);
}

exports.getAllImages = function (req, res) {
	Amazon.getAllImages(req, res);
}

exports.postImage = function (req, res) {
	Amazon.saveImage(req, res);
}

