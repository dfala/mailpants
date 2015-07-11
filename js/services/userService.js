angular.module('mailPants')

.factory('userService', function ($http, $q, $location) {
	var service = {};


	service.loginUser = function (user) {
		var deferred = $q.defer();
		
		$http.post('/api/login', user)
		.success(function (response) {
			delete user.password;
			// TODO: response text is broken
			deferred.resolve(user);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.signUpUser = function (newUser) {
		var deferred = $q.defer();

		$http.post('/api/signup', newUser)
		.success(function (response) {
			delete newUser.password;
			// TODO: response text is broken
			deferred.resolve(newUser);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.getUserData = function () {
		var deferred = $q.defer();

		$http.get('/api/user')
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