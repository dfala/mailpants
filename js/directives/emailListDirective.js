angular.module('mailPants')

.directive('emailList', function (emailService, dataStorage, $location) {
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

				emailService.storeList(newList)
				.then(function (response) {
					console.log('response on directive:', response);
					scope.lists.unshift(response);
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}

			scope.selectList = function (list) {
				dataStorage.storeList(list);
				$location.path('/compose-email');
			}

		}
	}
})
