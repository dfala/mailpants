angular.module('mailPants')

.factory('unsubscribeService', function ($http, $q) {
	var service = {};

	service.unsubscribeEmail = function (listId, unsubEmail) {
		var deferred = $q.defer();

		var query = {
			listId: listId,
			unsubEmail: unsubEmail
		}

		$http.put('/api/unsubscribe', query)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return service;
});
