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

  return service;
})
