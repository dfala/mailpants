angular.module('mailPants')

.service('emailService',
function ($http, $q, dataStorage, $rootScope, emailWrapper) {
	var service = {};

	// Compose emails
	service.sendBatch = function (emailBody) {
		var deferred = $q.defer();

		var htmlBody = emailWrapper.topWrapper() + emailBody.html + emailWrapper.bottomWrapper(dataStorage.serveList()._id);
		var email = {
			subject: emailBody.subject,
			html: htmlBody
		}

		//TODO: refactor once user logs in
		email.from_email = $rootScope.userEmail;
		
		var emailList = dataStorage.serveList().emails;
		var toField = [];

		emailList.forEach(function (email) {
			var emailInstance = {
				email: email,
				type: "to"
			}
			toField.push(emailInstance);
		})
		email.to = toField;


		$http.post('/api/email', email)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(response);
		})


		return deferred.promise;
	}


	return service;
});
