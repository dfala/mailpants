angular.module('mailPants')

.directive('headerTemplate', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/headerTemplate.html',
		link: function (scope, elem, attrs) {
			// TODO: log use out on logout()
		}
	}
})