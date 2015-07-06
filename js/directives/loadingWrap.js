angular.module('mailPants')

.directive('loadingWrap', function () {
	return {
		restrict: 'E',
		scope: {
			status: '='
		},
		templateUrl: '/templates/loadingWrap.html'
	}
})