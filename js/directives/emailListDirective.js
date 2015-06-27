angular.module('mailPants')

.directive('emailList', function (emailService) {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/emailList.html',
		link: function (scope, elem, attrs) {
			
			scope.newEmails = function (addedEmails) {
				emailService.saveList(addedEmails)
				.then(function (response) {
					console.log('response on directive:', response)
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}

		}
	}
})