angular.module('mailPants')

.directive('emailList', function (listService, dataStorage, $location) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			var userEmail = 'dnlfala@gmail.com';

			var getLists = function (userEmail) {
				listService.getLists('dnlfala@gmail.com')
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

				listService.saveList(newList)
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


			scope.deleteList = function (id) {
				listService.deleteList(id)
				.then(function (response) {
					console.log('success reponse:', response);
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
