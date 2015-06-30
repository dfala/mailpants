angular.module('mailPants')

.controller('unsubscribeController',
function ($scope, listId, unsubEmail, unsubscribeService, $http) {
	unsubscribeService.unsubscribeEmail(listId, unsubEmail)
	.then(function (response) {
		console.info(response);
	})
	.catch(function (err) {
		throw new Error(err);
	})

});
