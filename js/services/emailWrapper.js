angular.module('mailPants')

.factory('emailWrapper', function () {
	var service = {};

	var topWrapper = '<div style="max-width: 100% !important; min-height: 300px !important; background-color: #eee; padding: 25px;">'
					+ '<div style="max-width: 800px; margin: 20px auto; border-radius: 2px; padding: 25px; background-color: #fff; border: 1px solid #C2C2C2;">';

	service.topWrapper = function () {
		return topWrapper;
	}

	service.bottomWrapper = function (listId) {
		var uri = "http://localhost:3000/#/unsubscribe/" + listId + "/*|EMAIL|*";

		var bottomWrapper = '<p><a href="' + uri + '" target="_blank">Unsubscribe</a></p>'
						+ '</div></div>';

		return bottomWrapper;
	}

	return service;
})
