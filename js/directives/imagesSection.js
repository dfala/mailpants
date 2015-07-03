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
			scope.images = $rootScope.activeUser.images;


			scope.addImage = function (imgUrl) {
		        $('#compose-email-section').find("div[contenteditable='true']").each(function() {
		        	var conteEditable = $(this);
		        	var newImage = '<img src="' + imgUrl + '" style="max-width: 100%;"/>';
			       	conteEditable.append(newImage);
			       	scope.closeImagesSelector();
			    });
			}
		}
	}
})