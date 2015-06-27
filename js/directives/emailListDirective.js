angular.module('mailPants')

.directive('emailList', function () {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/emailList.html',
		link: function (scope, elem, attrs) {
			// var emails = animalsArray = animals.split(",");

			scope.newEmails = function (addedEmails) {
				var emails = addedEmails.split(',');
				console.log(emails);
			}

		}
	}
})