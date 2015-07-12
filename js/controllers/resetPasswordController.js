angular.module('mailPants')

.controller('resetPasswordController', function ($scope, $location, resetPassword, resetEmail, $http) {
	console.log(resetPassword, resetEmail);

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