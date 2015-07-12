angular.module('mailPants')

.directive('authDirective', function ($rootScope, $location, $timeout, userService) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			$timeout(function () {
				if ($location.$$url === '/login') {
					$('#login-email').focus();
				} else {
					$('#signup-email').focus();
				}
			})

			scope.loginUser = function (user) {
				userService.loginUser(user)
				.then(function (response) {
					// hack to successRedirect on server not working
					$location.path('/email-list');
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

			scope.signUpUser = function (newUser) {
				userService.signUpUser(newUser)
				.then(function (response) {
					// hack to successRedirect on server not working
					$location.path('/email-list');
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

		}
	}
});