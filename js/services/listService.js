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


	service.getList = function (listId) {
		var deferred = $q.defer();

		var uri = '/api/list/' + listId;
		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.saveList = function (newList) {
		var deferred = $q.defer();

		// clean list object
		newList.addedEmails = newList.addedEmails.replace(/ /g,'');
		var encoded = escape(newList.addedEmails);

		if (encoded.indexOf('%0A') > 0) {
			// sanitizing csv copy paste
			newList.addedEmails = encoded.split('%0A');
		} else if (newList.addedEmails.indexOf(',') > 0) {
			// sanitizing comma-separated emails
			newList.addedEmails = newList.addedEmails.split(',');
		}

		if(!newList.addedEmails[newList.addedEmails.length - 1]) newList.addedEmails.pop();

		if (typeof newList.addedEmails === 'string') {
			newList.emailCount = 1;
		} else {
			newList.emailCount = newList.addedEmails.length;	
		}

		newList.emails = newList.addedEmails;
		
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


	service.modifyList = function (list, toRemove, remove) {
		var deferred = $q.defer();

		// Updating the new list
		list.emails = list.emails.filter(function (email, index) {
			for (var i = 0; i < toRemove.length; i++) {
				if (toRemove[i] === email) return false;
			}
			return true;
		})

		// Saving the changes

		if (remove) {
			var params = {
				list: list.emails,
				id: list._id
			}


			$http.put('/api/modifylist', params)
			.success(function (response) {
				deferred.resolve(response);
			})
			.error(function (err) {
				deferred.reject(err);
			})
		} else {
			var params = {
				list: list.emails,
				unsubs: toRemove,
				id: list._id
			}


			$http.put('/api/unsub-emails', params)
			.success(function (response) {
				deferred.resolve(response);
			})
			.error(function (err) {
				deferred.reject(err);
			})
		}

		return deferred.promise;
	}























	return service;
})
