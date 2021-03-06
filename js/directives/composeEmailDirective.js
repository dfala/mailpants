angular.module('mailPants')

.directive('composeEmail',
function ($rootScope, $http, $compile, emailService, $timeout, dataStorage, $location) {
  return {
    restrict: 'AE',
    scope: true,
    link: function (scope, elem, attrs) {

      scope.emailsLeft = $rootScope.userInfo.payment.emailsLeft;

      $timeout(function () {
        $('#email-subject-line').focus();

        // reasign value of img
        var imgBtn = $('[name="addImage"]')[0];

        // remove video btn
        var btn = $('[name="insertImage"]')[0];
        btn.remove();

        // bind image action on addImage name btn defined on app.js taOptions
        $(imgBtn).bind('click', function (event) {
          if ($rootScope.imagesSelector === true) {
            scope.imagesSelector = true;
            $rootScope.imagesSelector = false;
          }
        
          scope.$digest();
        })
      })

      scope.sendEmail = function (emailBody) {
        if (!scope.emailsLeft || scope.emailsLeft < 1) return alert('Please pay first.');
        if (!emailBody) alert('Come on... add something!');

        if (!emailBody.html) emailBody.html = '';
        emailBody.html = emailBody.html.replace(/<img/g, '<img style="max-width: 100% !important"');

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
});



// DEPRECATED TEMPLATE

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