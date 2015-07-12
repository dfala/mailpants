angular.module('mailPants')

.controller('listController',
function ($scope, activeList, listService) {

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

		listService.modifyList($scope.activeList, checkedEmails)
		.then(function (response) {
			console.log('response on controller:', response);
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}

	$scope.addEmail = function (email) {
		var index = checkedEmails.indexOf(email);
		if (index > -1) {
			checkedEmails.splice(index, index + 1);
		} else {
			checkedEmails.push(email);
		}

		console.log(checkedEmails);
	}

});