var exports = module.exports = {};

// Dependencies
var Amazon = require('../models/amazon.js');

// Heavy lifting
exports.getImage = function (req, res) {
	Amazon.getObject(req, res);
}