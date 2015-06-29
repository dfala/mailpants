angular.module('mailPants')

.directive('headerTemplate', function ($rootScope, $location) {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/headerTemplate.html',
		link: function (scope, elem, attrs) {
			// TODO: refactor once user auth
			scope.logout = function () {
				$rootScope.userEmail = undefined;
				$location.path('/#/');
			}
		}
	}
})