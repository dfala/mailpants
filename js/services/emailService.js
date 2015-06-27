angular.module('mailPants')

.service('emailService', function ($http, $q) {
	var service = {};

	
	// Compose emails
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



	// Email lists
	service.getLists = function (userEmail) {
		var deferred = $q.defer();
		var uri = '/emailLists/' + userEmail;
		
		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}


	service.saveList = function (newList) {
		var deferred = $q.defer();

		// clean list object
		var emailArray = newList.addedEmails.split(',');
		newList.emails = emailArray;
		newList.emailCount = emailArray.length;
		delete newList['addedEmails'];


		$http.post('/emailList', newList)
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