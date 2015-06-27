angular.module('mailPants', ['textAngular', 'ngRoute'])

.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html'
	})

	.when('/email-list', {
		templateUrl: '/templates/emailList.html'
	})

	.when('/compose-email', {
		templateUrl: '/templates/composeEmail.html'
	})

	.otherwise('/');
})