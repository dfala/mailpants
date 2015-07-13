angular.module('mailPants')

.factory('userService', function ($http, $q, $location, emailWrapper) {
	var service = {};


	service.forgotPassword = function (userInfo) {
		var data = {
			html: emailWrapper.forgotPassword(userInfo),
			subject: 'Reset your MailPants password',
			to: [{ email: userInfo.email, type: 'to' }],
			from_email: 'yofala@gmail.com'
		}

		$http.post('/api/forgot-password', data)
		.success(function (response) {
			alert('You will receive an email shortly.')
		})
		.error(function (err) {
			throw new Error(err);
		})
	}

	service.checkDataMatch = function (password, email) {
		var deferred = $q.defer();

		var uri = '/api/check-permission/' + password + '/' + email;
		
		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


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
			console.error(err);
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


	service.logout = function () {
		$http.put('/api/logout')
		.success(function (response) {
			console.info(response);
		})
		.error(function (err) {
			throw new Error(err);
		})
	}


	return service;
})