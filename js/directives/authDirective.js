angular.module('mailPants')

.directive('authDirective', function ($rootScope, $location, $timeout, userService, $http) {
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
				if(newUser.password !== newUser.repeatPassword) return alert('Your passwords don\'t match :(');

				userService.signUpUser(newUser)
				.then(function (response) {
					// hack to successRedirect on server not working
					$location.path('/email-list');
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

			// Forgot password
			scope.openForgot = function () {
				var email = prompt('What\'s your email?');
				if (!email) return;

				var uri = '/api/get-forgot-user/' + email;
				$http.get(uri)
				.success(function (response) {
					userService.forgotPassword(response);
				})
				.error(function (err) {
					throw new Error(err);
				});
			}

		}
	}
});