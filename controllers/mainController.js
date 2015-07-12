var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var UserInfo = require('../models/userInfo.js');
var User = require('../models/User.js');


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

// Forgot password
exports.forgotPassword = function (req, res) {
	// send forgot password email
	var error = function () { res.status(500).send('ERROR: Email(s) not sent.'); }
	var success = function (result) { res.json(result); }

	Mandrill.sendEmail(req.body, error, success);
}

exports.getUserClean = function (req, res) {
	var email = req.params.email;
	User.findOne({ 'email' : email }, function (err, foundEmail) {
		if (err) return res.status(500).send(err);
		
		var cleanUser = {
			email: email,
			password: foundEmail.password
		}
		return res.json(cleanUser);
	})
}

exports.resetPassword = function (req, res) {
	console.log(req.body);
	User.findOne({ 'email' : req.body.email }, function (err, foundUser) {
		if (err) return res.status(500).send(err);

		foundUser.password = foundUser.generateHash(req.body.password);
		foundUser.save(function (err, result) {
			if (err) return res.status(500).send(err);

			return res.json(result);
		})
	})
}






