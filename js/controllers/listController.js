angular.module('mailPants')

.controller('listController',
function ($scope, activeList, listService) {

	console.log(activeList);

	listService.getList(activeList)
	.then(function (response) {
		$scope.activeList = response;
		console.log(response);
	})
	.catch(function (err) {
		throw new Error(err);
	})

});