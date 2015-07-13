angular.module('mailPants')

.controller('listController',
function ($scope, activeList, listService, $location) {

	var checkedEmails = [];

	listService.getList(activeList)
	.then(function (response) {
		$scope.activeList = response;
	})
	.catch(function (err) {
		throw new Error(err);
	})


	$scope.deleteEmails = function () {
		if (!checkedEmails.length) return;

		listService.modifyList($scope.activeList, checkedEmails, true)
		.then(function (response) {
			checkedEmails = [];
			$scope.activeList = response;
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

	$scope.unsubscribeEmails = function (emails) {
		if (!checkedEmails.length) return;

		listService.modifyList($scope.activeList, checkedEmails, false)
		.then(function (response) {
			checkedEmails = [];
			$scope.activeList = response;
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

	$scope.addEmailToArray = function (email) {
		var index = checkedEmails.indexOf(email);
		if (index > -1) {
			checkedEmails.splice(index, index + 1);
		} else {
			checkedEmails.push(email);
		}
	}

	$scope.deleteList = function (id) {
		var confirmed = confirm("Deleting this list cannot be undone. Are you sure you want to delete it?");
		if (!confirmed) return;

		listService.deleteList(id)
		.then(function (response) {
			alert('The list was successfully deleted.')
			$location.path('/email-list')
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

});