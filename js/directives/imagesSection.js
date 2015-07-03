angular.module('mailPants')

.directive('imagesSection', function (imagesService) {
	return {
		restrict: 'E',
		scope: {
			imagesSelector: '='
		},
		templateUrl: '/templates/selectImage.html',
		link: function (scope, elem, attrs) {
			// magic
			scope.closeImagesSelector = function() {
				scope.imagesSelector = false;
			}

			// get images
			scope.getAllImages = function () {
				imagesService.getAllImages()
				.then(function (response) {
					console.log(response);
					
					scope.images = response;
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

		}
	}
})