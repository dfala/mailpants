angular.module('mailPants')

.directive('composeEmail', function (emailService, $location) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {

      scope.sendEmail = function (emailBody) {
        if (!emailBody) alert('Come on man... add something!');
        emailService.sendBatch(emailBody)
        .then(function (response) {
          $location.path('/email-list');
          // <p class="bg-success"></p>
        })
        .catch(function (err) {
          // <p class="bg-danger">...</p>
          throw new Error(err);
        });
      }

    }
  }
})
