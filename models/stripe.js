var keys = require('./keys.js');
var stripe = require("stripe")(keys.stripeSecretTest);
var User = require('../models/User.js');

var exports = module.exports = {};


exports.makePayment = function (req, res) {
	var stripeToken = req.body.id;

	var charge = stripe.charges.create({
		amount: req.body.amount,
		currency: "usd",
		source: stripeToken,
		description: "Example charge"
	}, function(err, charge) {
		// if (err && err.type === 'StripeCardError')
		if (err) return res.status(500).send(err);
		console.log(charge);
		return res.json(charge);
	});

}


exports.createUser = function (req, res) {
	var stripeToken = req.body.id;

	stripe.customers.create({
	  source: stripeToken,
	  description: req.body.email
	})
	.then(function (customer) {
		User.findOne({ 'email' : req.body.activeUser }, function (err, foundUser) {
			if (err) return res.status(500).send(err);

			foundUser.payment = {
				  stripeCustomerId: customer.id
				, emailsLeft: 100000
				, emailsSent: 0
				, lastPaymentDate: new Date()
				, payingUser: true
				, plan: 20
			}

			foundUser.save(function (err, result) {
				if (err) return res.status(500).send(err);
				
				stripe.customers.createSubscription(
				  customer.id,
				  {plan: "20plan"},
				  function(err, subscription) {
				    // asynchronously called
				    if (err) return res.status(500).send(err);
				    return res.json(subscription);
				  }
				);
			})
		})
	})
}





