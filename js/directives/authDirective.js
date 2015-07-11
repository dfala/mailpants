angular.module('mailPants')

.directive('authDirective', function ($rootScope, $location, $timeout, userService) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			$timeout(function () {
				$('#email-input').focus();
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