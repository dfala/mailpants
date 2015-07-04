angular.module('mailPants', ['textAngular', 'ngRoute'])

.config(['$provide', function($provide){
	// this demonstrates how to register a new tool and add it to the default toolbar
	$provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$rootScope', function (taRegisterTool, taOptions, $rootScope) {
	    // $delegate is the taOptions we are decorating
	    // here we override the default toolbars and classes specified in taOptions.
	    taOptions.toolbar = [
	        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
	        ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
	        ['justifyLeft','justifyCenter','justifyRight'],
	        ['html', 'insertImage', 'insertLink']
	    ];
	    // Leaving insertImage is necessary to trigger img resizing

	    taOptions.classes = {
	        focussed: 'focussed',
	        toolbar: 'btn-toolbar',
	        toolbarGroup: 'btn-group',
	        toolbarButton: 'btn btn-default',
	        toolbarButtonActive: 'active',
	        disabled: 'disabled',
	        textEditor: 'form-control',
	        htmlEditor: 'form-control'
	    };

        taRegisterTool('addImage', {
            iconclass: "fa fa-picture-o",
	        action: function(){
	        	$rootScope.imagesSelector = true;
                // this.$editor().wrapSelection('forecolor', 'red');
            }
        });
        taOptions.toolbar[3].push('addImage');

	    return taOptions; // whatever you return will be the taOptions
	}]);
}])

.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html'
	})

	.when('/login', {
		templateUrl: '/templates/login.html'
	})

	.when('/email-list', {
		templateUrl: '/templates/emailList.html',
		resolve: {
			emailUser: function ($rootScope, $location) {
				if (!$rootScope.userEmail) return $location.path('/login');
				return $rootScope.userEmail;
			}
		}
	})

	.when('/templates', {
		templateUrl: '/templates/emailTemplates.html'
		// resolve: {
		// 	emailUser: function ($rootScope, $location) {
		// 		if (!$rootScope.userEmail) return $location.path('/login');
		// 		return $rootScope.userEmail;
		// 	}
		// }
	})

	.when('/compose-email', {
		templateUrl: '/templates/composeEmail.html',
		resolve: {
			emailUser: function ($rootScope, $location) {
				if (!$rootScope.userEmail) return $location.path('/login');
				return $rootScope.userEmail;
			}
		}
	})

	.when('/dashboard', {
		templateUrl: '/templates/dashboard.html',
		resolve: {
			emailUser: function ($rootScope, $location) {
				if (!$rootScope.userEmail) return $location.path('/login');
				return $rootScope.userEmail;
			}
		}
	})

	.when('/template', {
		templateUrl: '/templates/emailTemplate.html'
	})

	.when('/unsubscribe/:listId/:unsubEmail', {
		templateUrl: '/templates/unsubscribe.html',
		controller: 'unsubscribeController',
		resolve: {
			listId: function ($route) {
				return $route.current.params.listId;
			},
			unsubEmail: function ($route) {
				return $route.current.params.unsubEmail;
			}
		}
	})

	.otherwise('/');
});
