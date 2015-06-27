angular.module('mailPants')

.directive('headerTemplate', function () {
	return {
		restrict: 'E',
		templateUrl: '/templates/headerTemplate.html'
	}
})