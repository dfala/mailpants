angular.module('mailPants')

.directive('stripeTransact', function ($http) {
	return {
		restrict: 'E',
		scope: true,
		link: function (scope, elem, attrs) {

		  var handler = StripeCheckout.configure({
		    key: 'pk_test_yLQ1DdfyEHcTIbsrpF3rWAj1',
		    image: '/styles/images/pants.png',
		    token: function(token) {
		    	token.amount = 20000;

		    	$http.post('/api/payment', token)
		    	.success(function (response) {
		    		console.info('response stripe directive: ', response);
		    	})
		    	.error(function (err) {
		    		console.error(err);
		    	});
		    }
		  });

		  $('#customButton').on('click', function(e) {
		    // Open Checkout with further options
		    handler.open({
		      name: 'Mailpants',
		      description: '2 widgets',
		      amount: 20000
		    });
		    e.preventDefault();
		  });

		  // Close Checkout on page navigation
		  $(window).on('popstate', function() {
		    handler.close();
		  });


		}
	}
})