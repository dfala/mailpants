angular.module('mailPants')

.directive('composeEmail', function (emailService, $timeout, dataStorage, $location) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {

      $timeout(function () {
        $('#email-subject-line').focus();
      })

      scope.sendEmail = function (emailBody) {
        if (!emailBody) alert('Come on man... add something!');
        emailService.sendBatch(emailBody)
        .then(function (response) {
          dataStorage.messageSuccess();
          $location.path('/dashboard');
        })
        .catch(function (err) {
          // <p class="bg-danger">...</p>
          throw new Error(err);
        });
      }

    }
  }
})
