angular.module('mailPants')

.directive('emailList', function (emailService) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			var userEmail = 'dnlfala@gmail.com';

			var getLists = function (userEmail) {
				emailService.getLists('dnlfala@gmail.com')
				.then(function (response) {
					console.log(response);
					scope.lists = response;
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}
			getLists();

			
			scope.newEmails = function (newList) {
				newList.userEmail = 'dnlfala@gmail.com';
				
				emailService.saveList(newList)
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