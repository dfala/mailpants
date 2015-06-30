angular.module('mailPants')

.directive('templatesDirective', function ($http) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      $http.get('/api/template')
      .success(function (response){
        console.log(response);
        scope.templateHtml = response[0].code;
      })
      .error(function (err) {
        throw new Error(err);
      })
    }
  }
})
