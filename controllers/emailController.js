var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var EmailList = require('../models/emailList.js');

exports.send = function (req, res) {
	var error = function () { res.status(500).send('ERROR: Email(s) not sent.'); }
	var success = function (result) { res.json(result); }

	Mandrill.sendEmail(req.body, error, success);
}

exports.saveList = function (req, res) {
	var newEmailList = new EmailList(req.body);
	newEmailList.save(function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}

exports.getLists = function (req, res) {
	var userEmail = req.params.userEmail;
	EmailList.find({ "userEmail": userEmail }, function (err, result) {
		if (err) return res.status(500).send(err);
		console.log(result);
		return res.json(result);
	})
}