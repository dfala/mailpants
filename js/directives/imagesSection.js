angular.module('mailPants')

.directive('imagesSection', function (imagesService, $rootScope) {
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

			// loading all images for user
			scope.images = $rootScope.userInfo.images;

			scope.addImage = function (imgUrl) {
		        $('#compose-email-section').find("div[contenteditable='true']").each(function() {
		        	var conteEditable = $(this);

					var newImage = '<img src="' + imgUrl + '" style="max-width: 100% !important;"/>';
					conteEditable.append(newImage);
			       	
			       	scope.closeImagesSelector();

			       	// Necessary to trigger img resizing
			       	$(this).blur();
			       	$(this).focus();
			    });
			}

			scope.removeImage = function (image) {
				var params = {
					image: image,
					userId: $rootScope.userInfo._id
				}

				scope.images = scope.images.filter(function (img) {
					if (img.Location === image.Location) return false;
					return true;
				})

				imagesService.deleteImage(params)
				.then(function (response) {
					console.info('Img removed');
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}
		}
	}
})