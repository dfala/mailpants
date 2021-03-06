angular.module('mailPants')


.directive('dashboardDirective', function ($rootScope, dataStorage, $timeout, dashboardService) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {


      // INIT
      var userEmail = $rootScope.userInfo.email;
      scope.status = true;
      scope.displayAll = true;


      // Check for email sucess message
      scope.successMessage = dataStorage.isSuccess();

      if (scope.successMessage === true) {
        $timeout(function () {
          scope.successMessage = false;
        }, 2500);
      }


      var getUserData = (function () {

          if (!userEmail) return console.warn('No user email defined');
          
          dashboardService.getUserData(userEmail)
          .then(function (response) {
            scope.allUserData = response;
            scope.status = false;
            scope.info = $rootScope.userInfo.payment;

          })
          .catch(function (err) {
            if (err.name === 'Unknown_Sender') {
              scope.status = false;
              return scope.noEmails = true;
            } else {
              throw new Error(err);
            }

          });

      })();


    }
  }
})




.directive('chooseData', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {

      // Change class
      elem.click(function (event) {
        $('#nav-menu').find('li').removeClass('active');
        elem.addClass('active');
        checkStatus();
      })

      var checkStatus = function () {
        cleanAllStatus();
        var dataType = attrs.time;

        $timeout(function () {
          if (dataType === 'all') scope.displayAll = true;
          if (dataType === '7') scope.displayLast7 = true;
          if (dataType === '30') scope.displayLast30 = true;
          if (dataType === '60') scope.displayLast60 = true;
          if (dataType === '90') scope.displayLast90 = true;
        })
      }

      function cleanAllStatus () {
        scope.displayAll = false;
        scope.displayLast7 = false;
        scope.displayLast30 = false;
        scope.displayLast60 = false;
        scope.displayLast90 = false;
      }

    }
  }
});
