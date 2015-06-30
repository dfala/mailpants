var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var EmailList = require('../models/emailList.js');


// Heavy lifting
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

exports.unsubscribe = function (req, res) {
	var listId = req.body.listId;
	var unsubEmail = req.body.unsubEmail;

	EmailList.findOne({
		"_id": listId
	}, function (err, list) {
		// remove item from array
		list.emails.remove(unsubEmail);

		if (list.unsubs.indexOf(unsubEmail) < 0) {
			// save email to unsubscribe array
			list.unsubs.push(unsubEmail);
			// update email count
			list.emailCount = list.emailCount - 1;
		}

		// save updated list
		list.save(function (err, result) {
			if (err) return res.status(500).send(err);
			return res.send("Successfully unsubscribed");
		})
	})
}
