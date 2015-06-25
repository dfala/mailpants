angular.module('mailPants')

.controller('DashboardController', function ($scope, emailService) {
	$scope.greeting = "hi pants!";

	$scope.sendEmail = function (htmlVariable) {
		if (!htmlVariable) alert('Come on man... add something!');

		emailService.send(htmlVariable);
	}
})