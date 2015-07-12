angular.module('mailPants')

.directive('headerTemplate', function ($rootScope, $location) {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/headerTemplate.html',
		link: function (scope, elem, attrs) {
			// TODO: refactor once user auth
			scope.logout = function () {
				$rootScope.userInfo = undefined;
				$location.path('/#/');
			}
		}
	}
})

.directive('hoverTemplate', function () {
	return {
		restrict: 'A',
		link: function ($scope, elem, atts) {
			elem.hover(function (event) {
				console.log(event);
				elem.addClass('blue-border');
			}, function (event) {
				elem.removeClass('blue-border');
			})
		}
	}
})

.directive('footerTemplate', function () {
	return {
		templateUrl: '/templates/footer.html'
	}
});