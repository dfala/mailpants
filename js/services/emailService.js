angular.module('mailPants')

.service('emailService', function ($http) {
	var service = {};

	
	service.send = function (html) {
		var email = {
			html: html
		}

		$http.post('/email', email)
		.then(function (response) {
			console.log('response on service', response);
		})
		.catch(function (err) {
			throw new Error(err);
		})
	}


	return service;
})