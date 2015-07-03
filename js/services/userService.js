angular.module('mailPants')

.factory('userService', function ($http, $q) {
	var service = {};


	service.getUser = function (userEmail) {
		var deferred = $q.defer();

		var uri = '/api/user/' + userEmail;
		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.signUpUser = function (newUser) {
		var deferred = $q.defer();

		$http.post('/api/user', newUser)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	return service;
})