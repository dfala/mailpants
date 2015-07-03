angular.module('mailPants')

.directive('authDirective', function ($rootScope, $location, userService) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			scope.loginUser = function (userEmail) {
				userService.getUser(userEmail)
				.then(function (response) {
					if (response.noUser) return alert('No user found');

					$rootScope.activeUser = response;
					$rootScope.userEmail = response.email;
					$location.path('/email-list');
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

			scope.signUpUser = function (newUser) {
				userService.signUpUser(newUser)
				.then(function (response) {
					if (response.userExists) return alert('Email already exists');
					
					$rootScope.userEmail = response.email;
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