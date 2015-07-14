angular.module('mailPants')

.directive('stripeTransact', function ($http, $rootScope) {
	return {
		restrict: 'E',
		scope: true,
		link: function (scope, elem, attrs) {

		  var handler = StripeCheckout.configure({
		    key: 'pk_test_yLQ1DdfyEHcTIbsrpF3rWAj1',
		    image: '/styles/images/pants.png',
		    token: function(token) {
		    	token.amount = 2000;
		    	token.activeUser = $rootScope.userInfo.email;

		    	$http.post('/api/payment', token)
		    	.success(function (response) {
		    		console.info('response stripe directive: ', response);
		    		window.location.reload();
		    	})
		    	.error(function (err) {
		    		throw new Error(err);
		    	});
		    }
		  });

		  $('#paymentButton').on('click', function(e) {
		    // Open Checkout with further options
		    handler.open({
		      name: 'Mailpants',
		      description: '2 widgets',
		      amount: 2000
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