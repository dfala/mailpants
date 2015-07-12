angular.module('mailPants')

.directive('emailList',
function ($rootScope, $location, $timeout, listService, dataStorage) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			var userEmail = $rootScope.userInfo.email;

			var getLists = function () {
				listService.getLists(userEmail)
				.then(function (response) {
					scope.lists = response;
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}
			getLists();


			scope.newEmails = function (newList) {
				// return console.log(newList);
				newList.userEmail = userEmail;

				listService.saveList(newList)
				.then(function (response) {
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
