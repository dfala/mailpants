angular.module('mailPants')

.directive('emailList',
function (listService, dataStorage, $location, $timeout) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			// TODO: change this once user authentication
			var userEmail = 'dnlfala@gmail.com';

			// Check for email sucess message
			scope.successMessage = dataStorage.isSuccess();
			if (scope.successMessage === true) {
				$timeout(function () {
					scope.successMessage = false;
				}, 2000)
			}

			var getLists = function (userEmail) {
				listService.getLists('dnlfala@gmail.com')
				.then(function (response) {
					scope.lists = response;
				})
				.catch(function (err) {
					throw new Error(err);
				})
			}
			getLists();


			scope.newEmails = function (newList) {
				newList.userEmail = 'dnlfala@gmail.com';

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


			scope.deleteList = function (id) {
				listService.deleteList(id)
				.then(function (response) {
					scope.lists = scope.lists.filter(function (list, index) {
						if (list._id === response._id) return false;
						return true;
					})
				})
				.catch(function (err) {
					throw new Error(err);
				});
			}

		}
	}
})
