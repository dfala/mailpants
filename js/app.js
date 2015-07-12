angular.module('mailPants', ['textAngular', 'ngRoute'])

.config(function ($routeProvider) {

	// check for logged in user
	var checkUser = function ($rootScope, $location, userService, $q) {
		var deferred = $q.defer();

		userService.getUserData()
		.then(function (response) {
			$rootScope.userInfo = response;
			deferred.resolve(response);
		})
		.catch(function (err) {
			$location.path('/login');
			deferred.reject(err);
		});

		return deferred.promise;
	}


	////////////////////////////////////
	////////////// ROUTES //////////////
	////////////////////////////////////

	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html'
	})

	.when('/login', {
		templateUrl: '/templates/login.html'
	})

	.when('/sign-up', {
		templateUrl: '/templates/login.html'
	})

	.when('/email-list', {
		templateUrl: '/templates/emailList.html',
		resolve: {
			userData: checkUser
		}
	})

	.when('/list/:listId', {
		templateUrl: '/templates/activeList.html',
		controller: 'listController',
		resolve: {
			userData: checkUser,
			activeList: function ($route) {
				return $route.current.params.listId;
			}
		}
	})

	.when('/templates', {
		templateUrl: '/templates/emailTemplates.html',
		resolve: {
			userData: checkUser
		}
	})

	.when('/compose-email', {
		templateUrl: '/templates/composeEmail.html',
		resolve: {
			userData: checkUser
		}
	})

	.when('/dashboard', {
		templateUrl: '/templates/dashboard.html',
		resolve: {
			userData: checkUser
		}
	})

	.when('/template', {
		templateUrl: '/templates/emailTemplate.html',
		resolve: {
			userData: checkUser
		}
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

	.when('/reset/:password/:email', {
		templateUrl: '/templates/resetPassword.html',
		controller: 'resetPasswordController',
		resolve: {
			resetPassword: function ($route) {
				return $route.current.params.password;
			},
			resetEmail: function ($route) {
				return $route.current.params.email;
			}
		}
	})

	.otherwise('/');
})






////////////////////////////////////
///////////// WYSIWYG //////////////
////////////////////////////////////

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
}]);