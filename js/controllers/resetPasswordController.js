angular.module('mailPants')

.controller('resetPasswordController',
function ($scope, $location, resetPassword, userService, resetEmail, $http) {
	console.log(resetPassword, resetEmail);


	var checkDataMatch = function () {
		userService.checkDataMatch(resetPassword, resetEmail)
		.then(function (response) {
			console.log(response);
			$scope.permitted = true;
		})
		.catch(function (err) {
			console.log(err);
			$scope.permitted = false;
		});
	}

	checkDataMatch();


	$scope.resetPassword = function (newPassword) {
		if (!resetEmail || !resetPassword) return;
		if ($scope.newPassword !== $scope.confirmPassword)
			return alert('Your passwords don\'t match');
		
		var data = {
			email: resetEmail,
			password: resetPassword,
			newPassword: newPassword
		}

		$http.put('/api/reset-password', data)
		.success(function (response) {
			alert('Password has been reset.');
			$location.path('/email-list');
		})
		.error(function (err) {
			throw new Error(err);
		})
	}
});