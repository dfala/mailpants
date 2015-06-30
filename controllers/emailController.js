var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var EmailList = require('../models/emailList.js');
var UserInfo = require('../models/userInfo.js');

// Heavy lifting
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
		// console.log(result);
		return res.json(result);
	})
}

exports.deleteList = function (req, res) {
	var userId = req.params.listId;
	EmailList.findByIdAndRemove(userId, function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}

exports.getUserInfo = function (req, res) {
	var userEmail = req.params.userEmail;

	var error = function (err) { res.status(500).send(err); }
	var success = function (result) { res.json(result) }

	UserInfo.getInfo(userEmail, error, success);
}

exports.unsubscribe = function (req, res) {
	var listId = req.body.listId;
	var unsubEmail = req.body.unsubEmail;

	EmailList.findOne({
		"_id": listId
	}, function (err, list) {
		console.log(list);

		// remove email from array
		var tempList = [];
		list.emails.forEach(function (email, index) {
			if (email !== unsubEmail) return tempList.push(email);
		})

		list.emails = tempList;

		// save email to unsubscribe array
		list.unsubs.push(unsubEmail);

		// update email count
		list.emailCount = list.emailCount - 1;

		// save updated list
		list.save(function (err, result) {
			if (err) return res.status(500).send(err);
			// console.log(result);
			return res.json(result);
		})
	})
}
