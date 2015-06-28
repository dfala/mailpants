angular.module('mailPants')

.factory('dashboardService', function ($http, $q) {
  var service = {};

  service.getUserData = function (userEmail) {
    var deferred = $q.defer();
    var uri = '/api/userinfo/' + userEmail;

    $http.get(uri)
    .success(function (response) {
      deferred.resolve(response);
    })
    .error(function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  return service;
});
