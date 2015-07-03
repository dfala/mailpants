var exports = module.exports = {};

// Dependencies
var mandrill = require('mandrill-api/mandrill');
var keys = require('./keys.js');
var User = require('./User.js');
var Amazon = require('./amazon.js');
var mandrill_client = new mandrill.Mandrill(keys.mandrill);

exports.getMandrillInfo = function (userEmail, error, success) {
  var query = {
    address: userEmail
  }

  mandrill_client.senders.info(query, function (result, err) {
      return success(result);
  }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      return error(e);
  });
}

exports.getUserInfo = function (req, res) {
	var query  = User.where({ "email": req.params.userEmail });
	query.findOne(function (err, result) {
		if (err === null && result === null) return res.json({"noUser": true});
		if (err) return res.status(500).send(err);
		return res.json(result);
	})
}

exports.createUser = function (req, res) {
	User.find({email: req.body.email}, function (err, result) {
		console.log(result);
		if (!result.length) {
			var newUser = new User(req.body);
			newUser.save(function (err, result) {
				if (err) return res.status(500).send(err);

				// Create amazon folder for user
				//Amazon.createFolder(req, res, result);

				return res.json(result);
			});
		} else {
			res.json({"userExists": true});
		}
	})
}
