angular.module('mailPants')

.factory('imagesService', function ($http, $q) {
	var service = {};

	service.storeImage = function (imageData, fileName) {
		var deferred = $q.defer();

		// imageData = imageData.slice(imageData.indexOf('base64,') + 7);

		var newImage = {
			imageName: fileName,
			imageBody: imageData
		}

		$http.post('/api/newimage', newImage)
		.success(function (response) {
			console.info(response);
		})
		.error (function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return service;
})