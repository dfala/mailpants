angular.module('mailPants')

.directive('composeEmail', function ($http, emailService, $timeout, dataStorage, $location) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {

      $timeout(function () {
        $('#email-subject-line').focus();

        // testing purposes
        
        // elem.contents().find("div[contenteditable='true']").each(function() {
        //     var conteEditable = $(this);
        //     $http.get('/api/template')
        //     .success(function (response){
        //       var templateHtml = response[0].code;
        //       conteEditable.append(templateHtml);
        //     })
        //     .error(function (err) {
        //       throw new Error(err);
        //     })
        // });
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
