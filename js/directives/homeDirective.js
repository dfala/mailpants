angular.module('mailPants')

.directive('homeTemplate', function () {
	return {
		restrict: "E",
		scope: true,
		templateUrl: 'templates/home.html',
		link: function (scope, elem, attrs) {
			// console.log('hi!');
		}
	}
})
