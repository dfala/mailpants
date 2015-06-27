angular.module('mailPants')

.directive('composeEmail', function (emailService) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      
      scope.sendEmail = function (htmlVariable) {
        if (!htmlVariable) alert('Come on man... add something!');
        emailService.sendBatch(htmlVariable);
      }
      
    }
  }
})
