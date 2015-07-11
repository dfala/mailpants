angular.module('mailPants')

.factory('imagesService', function ($http, $q, $rootScope) {
	var service = {};

	service.storeImage = function (imageData, fileName) {
		var deferred = $q.defer();

		// imageData = imageData.slice(imageData.indexOf('base64,') + 7);
		var imageExtension = imageData.split(';')[0].split('/');
		imageExtension = imageExtension[imageExtension.length - 1];

		var newImage = {
			imageName: fileName,
			imageBody: imageData,
			imageExtension: imageExtension,
			userEmail: $rootScope.userInfo.email
		}

		$http.post('/api/newimage', newImage)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error (function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.deleteImage = function (image) {
		var deferred = $q.defer();

		$http.put('/api/image', image)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}


	service.getImage = function (imageName) {
		var deferred = $q.defer();

		var uri = '/api/newimage/' + encodeURI(imageName);
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