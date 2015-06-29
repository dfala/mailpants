angular.module('mailPants')

.directive('loginDirective', function ($rootScope, $location) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			scope.loginUser = function (userEmail) {
				$rootScope.userEmail = userEmail;
				$location.path('/email-list');
			}

		}
	}
});