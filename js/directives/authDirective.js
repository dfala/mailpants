angular.module('mailPants')

.directive('authDirective', function ($rootScope, userService, $location) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			scope.loginUser = function (user) {
				userService.loginUser(user)
				.then(function (response) {
					// $rootScope.activeUser = response;
					// $rootScope.userEmail = response.email;

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
					// if (response.userExists) return alert('Email already exists');
					// $rootScope.userEmail = response.email;

					// hack to successRedirect on server not working
					$location.path('/email-list');
				})
				.catch(function (err) {
					console.error(err);
					// throw new Error(err);
				});
			}

		}
	}
});