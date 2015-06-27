angular.module('mailPants')

.service('emailService', function ($http, $q, dataStorage) {
	var service = {};


	// Compose emails
	service.sendBatch = function (emailBody) {
		var email = {
			subject: emailBody.subject,
			html: emailBody.html
		}

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

		$http.post('/email', email)
		.success(function (response) {
			console.log('response on service', response);
		})
		.error(function (err) {
			throw new Error(err);
		})
	}



	// Email lists
	service.getLists = function (userEmail) {
		var deferred = $q.defer();
		var uri = '/emailLists/' + userEmail;

		$http.get(uri)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}


	service.storeList = function (newList) {
		var deferred = $q.defer();

		// clean list object
		var emailArray = newList.addedEmails.split(',');
		if(!emailArray[emailArray.length - 1]) emailArray.pop();

		newList.emails = emailArray;
		newList.emailCount = emailArray.length;
		delete newList['addedEmails'];

		$http.post('/emailList', newList)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		})

		return deferred.promise;
	}


	return service;
})
