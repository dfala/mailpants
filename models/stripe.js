var keys = require('./keys.js');
var stripe = require("stripe")(keys.stripeSecretTest);

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
		return res.json(charge);
	});

}



// REQ.BODY EXAMPLE DATA
// { id: 'tok_16LZLxESGLnXaqA0m6M4l5O2',
//   livemode: false,
//   created: 1436188185,
//   used: false,
//   object: 'token',
//   type: 'card',
//   card:
//    { id: 'card_16LZLxESGLnXaqA0yz8wtqTs',
//      object: 'card',
//      last4: '4242',
//      brand: 'Visa',
//      funding: 'credit',
//      exp_month: 2,
//      exp_year: 2016,
//      country: 'US',
//      name: 'dnlfala@gmail.com',
//      address_line1: null,
//      address_line2: null,
//      address_city: null,
//      address_state: null,
//      address_zip: null,
//      address_country: null,
//      cvc_check: 'pass',
//      address_line1_check: null,
//      address_zip_check: null,
//      tokenization_method: null,
//      dynamic_last4: null,
//      metadata: {} },
//   email: 'dnlfala@gmail.com',
//   verification_allowed: true,
//   client_ip: '216.21.163.17' }










