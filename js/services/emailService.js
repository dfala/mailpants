angular.module('mailPants')

.service('emailService', function ($http, $q) {
	var service = {};

	
	service.send = function (html) {
		var email = {
			html: html
		}

		$http.post('/email', email)
		.success(function (response) {
			console.log('response on service', response);
		})
		.error(function (err) {
			throw new Error(err);
		})
	}


	service.saveList = function (emailString) {
		var deferred = $q.defer();

		var emailArray = emailString.split(',');
		var emailList = {
			emails: emailArray,
			emailCount: emailArray.length,
			userEmail: 'dnlfala@gmail.com'
		}

		$http.post('/emailList', emailList)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}


	return service;
})