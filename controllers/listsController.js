var exports = module.exports = {};

// Dependencies
var Mandrill = require('../models/mandrill.js');
var EmailList = require('../models/emailList.js');
var User = require('../models/User.js');
var List = require('../models/emailList.js');


// Heavy lifting
exports.saveList = function (req, res) {
	var newEmailList = new EmailList(req.body);

	// Save new list
	newEmailList.save(function (err, result) {
		if (err) return res.status(500).send(err)

		// Push to User list array
		User.findOne({ "email": result.userEmail }, function (err, userDoc) {
			if (err) return res.stats(500).send(err);

			userDoc.lists.push(result._id);
			userDoc.save(function (err, oldDoc) {
				if (err) return res.stats(500).send(err);
				return res.json(result);
			})
		})
	})
}

exports.getLists = function (req, res) {
	var userEmail = req.params.userEmail;
	EmailList.find({ "userEmail": userEmail }, function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}

exports.getList = function (req, res) {
	var listId = req.params.listId;
	List.findById(listId, function (err, list) {
		if (err) return res.status(500).send(err);
		return res.json(list);
	});
}

exports.modifyList = function (req, res) {
	List.findById(req.body.id, function (err, list) {
		if (err) return res.status(500).send(err);
		
		list.emails = req.body.list;
		list.emailCount = req.body.list.length;
		
		list.save(function (err, updatedList) {
			if (err) return res.status(500).send(err);
			return res.json(updatedList);
		})
	})
}

exports.unsubEmails = function (req, res) {
	List.findById(req.body.id, function (err, list) {
		if (err) return res.status(500).send(err);

		req.body.unsubs.forEach(function (email) {
			list.unsubs.push(email);
		})

		list.emails = req.body.list;
		list.emailCount = req.body.list.length;
		
		list.save(function (err, updatedList) {
			if (err) return res.status(500).send(err);
			return res.json(updatedList);
		})
	})
}

exports.deleteList = function (req, res) {
	var listId = req.params.listId;

	// Delete list
	EmailList.findByIdAndRemove(listId, function (err, result) {
		if (err) return res.status(500).send(err);

		// Delete list id from User document
		User.findOne({ "email": result.userEmail }, function (err, userDoc) {
			if (err) return res.stats(500).send(err);

			userDoc.lists.remove(listId);
			console.log(userDoc.lists);
			userDoc.save(function (err, updatedDoc) {
				if (err) return res.stats(500).send(err);
				return res.json(result);
			})
		})

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
