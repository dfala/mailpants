angular.module('mailPants')

.factory('dataStorage', function () {
  var service = {};

  var storedList = {};
  service.storeList = function (list) {
    return storedList = list;
  }

  service.serveList = function () {
  	return storedList;
  }


  ////////////////////////////////////

  var sentSuccess = false;
  service.messageSuccess = function () {
  	sentSuccess = true;
  }

  service.isSuccess = function () {
  	if (sentSuccess === true) {
  		sentSuccess = false;
  		return true;
  	}	
  	return sentSuccess;
  }

  return service;
})
