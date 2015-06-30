angular.module('mailPants')

.directive('unsubscribeActions', function () {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {
			// console.log(userEmail, unsubEmail);
		}
	}
})