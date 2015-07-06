var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var UserInfo = require('../models/userInfo.js');


var mandrill = require('mandrill-api/mandrill');
var keys = require('../models/keys.js');
var mandrill_client = new mandrill.Mandrill(keys.mandrill);

// Send email
exports.send = function (req, res) {
	var error = function () { res.status(500).send('ERROR: Email(s) not sent.'); }
	var success = function (result) { res.json(result); }

	Mandrill.sendEmail(req.body, error, success);
}

// Get template
exports.getTemplate = function (req, res) {
	mandrill_client.templates.list({"name": "coupon"}, function(result) {
		res.json(result);
	}, function(e) {
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		res.status(500).send(e);
	});
}


// User-related
exports.userMandrillInfo = function (req, res) {
	var userEmail = req.params.userEmail;

	var error = function (err) { res.status(500).send(err); }
	var success = function (result) { res.json(result) }

	UserInfo.getMandrillInfo(userEmail, error, success);
}

exports.getUserInfo = function (req, res) {
	UserInfo.getUserInfo(req, res);
}

exports.createUser = function (req, res) {
	UserInfo.createUser(req, res);
}