angular.module('mailPants')

.factory('listService', function ($http, $q) {
	var service = {};

	// Email lists
	service.getLists = function (userEmail) {
		var deferred = $q.defer();
		var uri = '/api/emailLists/' + userEmail;

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
		if(!emailArray[emailArray.length - 1]) emailArray.pop();

		newList.emails = emailArray;
		newList.emailCount = emailArray.length;
		delete newList['addedEmails'];

		$http.post('/api/emailList', newList)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}


	service.deleteList = function (listId) {
		var deferred = $q.defer();

		var uri = '/api/list/' + listId;
		$http.delete(uri)
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
