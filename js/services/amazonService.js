angular.module('mailPants')

.factory('amazonService', function ($http, $q) {
	var service = {};


	service.getImage = function (imageName) {
		var deferred = $q.defer();

		var uri = '/api/image/' + encodeURI(imageName);
		$http.get(uri)
		.success(function (response) {
			console.info(response);
			response.Body = 'data:' + response.ContentType + ';base64,' + response.Body;
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});


		return deferred.promise;
	}


	return service;
})