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

exports.subscribeUser = function (req, res) {
	var stripe = require("stripe")(
	  keys.stripeSecretTest
	);

	stripe.customers.createSubscription(
	  "cus_6bP9CymKaG02KC",
	  {plan: "20plan"},
	  function(err, subscription) {
	    // asynchronously called
	    if (err) return res.status(500).send(err);
	    return res.json(subscription);
	  }
	);
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

			foundUser.stripeCustomerId = customer.id;
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


// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
// var stripeToken = request.body.stripeToken;

// stripe.customers.create({
//   source: stripeToken,
//   description: 'payinguser@example.com'
// }).then(function(customer) {
//   return stripe.charges.create({
//     amount: 1000, // amount in cents, again
//     currency: "usd",
//     customer: customer.id
//   });
// }).then(function(charge) {
//   saveStripeCustomerId(user, charge.customer);
// });

// // Later...
// var customerId = getStripeCustomerId(user);

// stripe.charges.create({
//   amount: 1500, // amount in cents, again
//   currency: "usd",
//   customer: customerId
// });






