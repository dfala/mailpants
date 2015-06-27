var exports = module.exports = {};
var Mandrill = require('../models/mandrill.js');

exports.send = function (req, res) {
	var error = function () { res.status(500).send('ERROR: Email(s) not sent.'); }
	var success = function (result) { res.json(result); }

	Mandrill.sendEmail(req.body, error, success);
}