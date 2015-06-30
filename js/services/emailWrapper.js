angular.module('mailPants')

.factory('emailWrapper', function () {
	var service = {};

	var topWrapper = '<div style="max-width: 100% !important; min-height: 300px !important; background-color: #eee; padding: 25px;">'
					+ '<div style="max-width: 800px; margin: 20px auto; border-radius: 2px; padding: 25px; background-color: #fff; border: 1px solid #C2C2C2;">';
	var bottomWrapper = "</div></div>";

	service.topWrapper = function () {
		return topWrapper;
	}

	service.bottomWrapper = function () {
		return bottomWrapper;
	}

	return service;
})