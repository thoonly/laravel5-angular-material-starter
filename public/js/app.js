(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config'
		]);


	angular.module('app.routes', ['ui.router', 'ngStorage', 'satellizer']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'ngMdIcons', 'angular-loading-bar','ngMessages','validation.match']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router', 'ngStorage', 'restangular']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();
(function () {
    "use strict";

    angular.module('app.routes').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        var getView = function (viewName) {
            return './views/app/' + viewName + '/' + viewName + '.html';
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    sidebar: {
                        templateUrl: getView('sidebar')
                    },
                    header: {
                        templateUrl: getView('header')
                    },
                    rightbar: {
                        templateUrl: getView('rightbar')
                    },
                    main: {}
                }
            })
            .state('app.home', {
                url: '/',
                data: {
                    pageName: 'Home'
                },
                views: {
                    'main@': {
                        templateUrl: getView('home')
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                data: {
                    pageName: 'Login'
                },
                views: {
                    'main@': {
                        templateUrl: getView('login')
                    }
                }
            })
            //.state('app.landing', {
            //    url: '/',
            //    data: {pageName: 'Overview'},
            //    views: {
            //        'main@': {
            //            templateUrl: getView('landing')
            //        }
            //    }
            //})
            .state('app.install', {
                url: '/install',
                data: {pageName: 'Install'},
                views: {
                    'main@': {
                        templateUrl: getView('install')
                    }
                }
            })
            .state('app.tabs', {
                url: '/features',
                data: {pageName: 'Features'},
                views: {
                    'main@': {
                        templateUrl: getView('tabs')
                    }
                }
            })
            .state('app.deploy', {
                url: '/deploy',
                data: {pageName: 'Deploy'},
                views: {
                    'main@': {
                        templateUrl: getView('deploy')
                    }
                }
            })
            .state('app.theme', {
                url: '/theme',
                data: {pageName: 'Theme'},
                views: {
                    'main@': {
                        templateUrl: getView('theme')
                    }
                }
            })
            .state('app.toasts', {
                url: '/toasts',
                data: {pageName: 'Toasts'},
                views: {
                    'main@': {
                        templateUrl: getView('toasts')
                    }
                }
            })
            .state('app.dialogs', {
                url: '/dialogs',
                data: {pageName: 'Dialogs'},
                views: {
                    'main@': {
                        templateUrl: getView('dialogs')
                    }
                }
            })
            .state('app.generators', {
                url: '/generators',
                data: {pageName: 'Artisan generators'},
                views: {
                    'main@': {
                        templateUrl: getView('generators')
                    }
                }
            })
            .state('app.jwt_auth', {
                url: '/jwt_auth',
                data: {pageName: 'JSON Web Token Authentication'},
                views: {
                    'main@': {
                        templateUrl: getView('jwt_auth')
                    }
                }
            })
            .state('app.elixir', {
                url: '/elixir',
                data: {pageName: 'Elixir'},
                views: {
                    'main@': {
                        templateUrl: getView('elixir')
                    }
                }
            })
            .state('app.rest_api', {
                url: '/rest_api',
                data: {pageName: 'REST API'},
                views: {
                    'main@': {
                        templateUrl: getView('rest_api')
                    }
                }
            })
            .state('app.unsupported_browser', {
                url: '/unsupported_browser',
                data: {pageName: 'Unsupported Browser'},
                views: {
                    'main@': {
                        templateUrl: getView('unsupported_browser')
                    }
                }
            })
            .state('app.misc', {
                url: '/misc',
                data: {pageName: 'Miscellaneous features'},
                views: {
                    'main@': {
                        templateUrl: getView('misc')
                    }
                }
            })
        ;


    }]);
})();

(function(){
	"use strict";

	angular.module('app.routes').run(["$rootScope", "$mdSidenav", function($rootScope, $mdSidenav){
		$rootScope.$on("$stateChangeStart", function(event, toState){

			if (toState.data && toState.data.pageName){
				$rootScope.current_page = toState.data.pageName;
			}


		});
		$rootScope.$on("$viewContentLoaded", function(event, toState){
			window.Prism.highlightAll();
		});

		$rootScope.$on("$stateChangeSuccess", function(event, toState){
			$mdSidenav('left').close();
		});
	}]);

})();

(function (){
    "use strict";

    angular.module('app.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/authenticate/auth';
    }]);

})();

(function (){
	"use strict";

	angular.module('app.config').config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider){
		cfpLoadingBarProvider.includeSpinner = false;
	}]);

})();

(function(){
	"use strict";

	angular.module('app.config').config( ["RestangularProvider", function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/')
		.setDefaultHeaders({ accept: "application/x.laravel.v1+json" });
	}]);

})();

(function () {
    "use strict";

    angular.module('app.config').config(["$mdThemingProvider", function ($mdThemingProvider) {
        /* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('blue-grey')
            .warnPalette('red');

    }]);

})();

(function(){
	"use strict";

	angular.module('app.filters').filter( 'capitalize', function(){
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	});
})();

(function(){
	"use strict";

	angular.module('app.filters').filter( 'humanReadable', function(){
		return function humanize(str) {
			if ( !str ){
				return '';
			}
			var frags = str.split('_');
			for (var i=0; i<frags.length; i++) {
				frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
			}
			return frags.join(' ');
		};
	});
})();
(function(){
    'use strict';

    angular.module('app.filters').filter('truncateCharacters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) {
                return input;
            }
            if (chars <= 0) {
                return '';
            }
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    // Get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length-1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    });
})();
(function(){
    'use strict';

    angular.module('app.filters').filter('truncateWords', function () {
        return function (input, words) {
            if (isNaN(words)) {
                return input;
            }
            if (words <= 0) {
                return '';
            }
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                }
            }
            return input;
        };
    });
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', ["$sce", function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter('ucfirst', function() {
		return function( input ) {
			if ( !input ){
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	});

})();

(function(){
	"use strict";

	angular.module("app.services").factory('DialogService', ["$mdDialog", function($mdDialog){

		return {
			fromTemplate: function(template, $scope){

				var options = {
					templateUrl: './views/dialogs/' + template + '/' + template + '.html'
				};

				if ($scope){
					options.scope = $scope.$new();
				}

				return $mdDialog.show(options);
			},

			hide: function(){
				return $mdDialog.hide();
			},

			alert: function(title, content){
				$mdDialog.show(
					$mdDialog.alert()
						.title(title)
						.content(content)
						.ok('Ok')
				);
			},

			confirm: function(title, content) {
				return $mdDialog.show(
					$mdDialog.confirm()
						.title(title)
						.content(content)
						.ok('Ok')
						.cancel('Cancel')
				);
			}
		};
	}]);
})();
(function(){
	"use strict";

	angular.module("app.services").factory('ToastService', ["$mdToast", function($mdToast){

		var delay = 6000,
			position = 'top right',
			action = 'OK';

		return {
			show: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.action(action)
						.hideDelay(delay)
				);
			},
			error: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.theme('warn')
						.action(action)
						.hideDelay(delay)
				);
			}
		};
	}]);
})();

(function() {
	"use strict";

	angular.module('app.controllers').controller('DialogsCtrl', ["$scope", "DialogService", function($scope, DialogService) {

		$scope.confirm_message = '';

		$scope.alertDialog = function() {
			DialogService.alert('This is an alert title', 'You can specify some description text in here.');
		};

		$scope.confirmDialog = function() {
			DialogService.confirm('This is a confirm title', 'Are you sure you want to do this?').then(
				function() {
					$scope.confirm_message = 'Confirm Success callback';
				},
				function() {
					$scope.confirm_message = 'Confirm Cancel callback';
				}
			);
		};

		$scope.customDialog = function() {
			DialogService.fromTemplate('add_users', $scope);
		};
	}]);

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('ElixirCtrl', function(){
        //
    });

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('GeneratorsCtrl', function(){
        //
    });

})();

(function(){
    "use strict";

    angular
        .module('app.controllers')
        .controller('HomeCtrl',HomeCtrl);

     function HomeCtrl(){
        //
    }

})();


(function(){
	"use strict";

	angular.module('app.controllers').controller('JwtAuthCtrl', ["$scope", "$auth", "Restangular", function($scope, $auth, Restangular){

		var credentials = {};

		$scope.requestToken = function(){
			// Use Satellizer's $auth service to login because it'll automatically save the JWT in localStorage
			$auth.login(credentials).then(function (data){
				// If login is successful, redirect to the users state
				//$state.go('dashboard');
			});
		};

		// This request will hit the getData method in the AuthenticateController
		// on the Laravel side and will return your data that require authentication
		$scope.getData = function(){
			Restangular.all('authenticate/data').get().then(function (response){

			}, function (error){});
		};



	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", "$interval", "ToastService", "DialogService", function($scope, $mdToast, $mdDialog, $interval, ToastService, DialogService){

		$scope.promoImage = 'https://i.imgur.com/ZbLzOPP.jpg';
		$scope.icon = 'send';

		var icons = [
				'office', 'facebook', 'twitter', 'apple', 'whatsapp', 'linkedin', 'windows', 'accessibility', 'alarm', 'aspect_ratio',
				'autorenew', 'bookmark_outline', 'dashboard', 'dns', 'favorite_outline', 'get_app', 'highlight_remove', 'history', 'list',
				'picture_in_picture', 'print', 'settings_ethernet', 'settings_power', 'shopping_cart', 'spellcheck', 'swap_horiz', 'swap_vert',
				'thumb_up', 'thumbs_up_down', 'translate', 'trending_up', 'visibility', 'warning', 'mic', 'play_circle_outline', 'repeat',
				'skip_next', 'call', 'chat', 'clear_all', 'dialpad', 'dnd_on', 'forum', 'location_on', 'vpn_key', 'filter_list', 'inbox',
				'link', 'remove_circle_outline', 'save', 'text_format', 'access_time', 'airplanemode_on', 'bluetooth', 'data_usage',
				'gps_fixed', 'now_wallpaper', 'now_widgets', 'storage', 'wifi_tethering', 'attach_file', 'format_line_spacing',
				'format_list_numbered', 'format_quote', 'vertical_align_center', 'wrap_text', 'cloud_queue', 'file_download', 'folder_open',
				'cast', 'headset', 'keyboard_backspace', 'mouse', 'speaker', 'watch', 'audiotrack', 'edit', 'brush', 'looks', 'crop_free',
				'camera', 'filter_vintage', 'hdr_strong', 'photo_camera', 'slideshow', 'timer', 'directions_bike', 'hotel', 'local_library',
				'directions_walk', 'local_cafe', 'local_pizza', 'local_florist', 'my_location', 'navigation', 'pin_drop', 'arrow_back', 'menu',
				'close', 'more_horiz', 'more_vert', 'refresh', 'phone_paused', 'vibration', 'cake', 'group', 'mood', 'person',
				'notifications_none', 'plus_one', 'school', 'share', 'star_outline'
			],
			counter = 0;

		$interval(function(){
			$scope.icon = icons[++counter];
			if (counter > 112){
				counter = 0;
			}
		}, 2000);

	}]);

})();

(function(){
    "use strict";

    angular
        .module('app.controllers')
        .controller('LoginCtrl',LoginCtrl);

     function LoginCtrl(){
        //
    }

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('MiscCtrl', function(){
        //
    });

})();

(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($auth) {

        var vm =this;
        vm.register = register;

        function register() {

            var credentials = {
                email:vm.email,
                password:vm.password,
            };

            $auth.signup(credentials).then(function (data) {
                // If login is successful, redirect to the users state
                //$state.go('dashboard');
            });
        }


    }
    RegisterCtrl.$inject = ["$auth"];

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('RestApiCtrl', function(){
        //
    });

})();

(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('RightbarCtrl', RightbarCtrl);

    function RightbarCtrl($mdSidenav,$log) {
        var vm = this;
        vm.toggleRight = buildToggler('right');
        vm.Rightbarclose = Rightbarclose;

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }


        function Rightbarclose() {

            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }
    }
    RightbarCtrl.$inject = ["$mdSidenav", "$log"];


})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('SidebarCtrl', ["$scope", "$state", function($scope, $state){


	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', function(){

	});

})();
(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('HeaderCtrl', HeaderController);

    function HeaderController($scope,$rootScope, $mdSidenav,$mdDialog, $log) {

        var getView = function (viewName) {
            return './views/app/' + viewName + '/' + viewName + '.html';
        };
        var vm = this;


        vm.showRegister = showRegister;
        vm.openSideNav = openSideNav;
        vm.toggleRight = toggleRight;

        $scope.$watch(function () {
            return $rootScope.current_page;
        }, function (newPage) {
            $scope.current_page = newPage || 'Page Name';
        });

        function openSideNav() {
            $mdSidenav('left').open();
        };
        function toggleRight() {
            $mdSidenav('right').open();
        };


        function showRegister(ev) {
            $mdDialog.show({
                controller: DialogCtrl,
                templateUrl: getView('register'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogCtrl($mdDialog){
            var vm=this;
            vm.hide=hide;
            vm.cancle=cancle;
            vm.answer=answer;

            function hide() {
                $mdDialog.hide();
            };
            function cancle() {
                $mdDialog.cancel();
            };
            function answer(answer) {
                $mdDialog.hide(answer);
            };
        }
        DialogCtrl.$inject = ["$mdDialog"];
    }
    HeaderController.$inject = ["$scope", "$rootScope", "$mdSidenav", "$mdDialog", "$log"];;

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('UnsupportedBrowserCtrl', function(){
        //
    });

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('ToastsCtrl', ["$scope", "ToastService", function($scope, ToastService){

		$scope.toastSuccess = function(){
			ToastService.show('User added successfully!');
		};

		$scope.toastError = function(){
			ToastService.error('Connection interrupted!');
		};

	}]);

})();

(function(){
    "use strict";

    angular.module('app.controllers').controller('AddUsersCtrl', ["$scope", "DialogService", function($scope, DialogService){

        $scope.save = function(){
	        //do something useful
            DialogService.hide();
        };

        $scope.hide = function(){
        	DialogService.hide();
        };

    }]);

})();

(function(){
	"use strict";

	angular.module( 'app.controllers' ).controller( 'DataListingCtrl', function(){
		//
    });

})();

(function(){
	"use strict";

	angular.module('app.directives').directive( 'dataListing', function() {

		return {
			restrict: 'EA',
			templateUrl: 'views/directives/data_listing/data_listing.html',
			controller: 'DataListingCtrl',
			link: function( scope, element, attrs ){
				//
			}
		};

	});

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJyb3V0ZXMucnVuLmpzIiwiY29uZmlnL2F1dGguanMiLCJjb25maWcvbG9hZGluZ19iYXIuanMiLCJjb25maWcvcmVzdGFuZ3VsYXIuanMiLCJjb25maWcvdGhlbWUuanMiLCJmaWx0ZXJzL2NhcGl0YWxpemUuanMiLCJmaWx0ZXJzL2h1bWFuX3JlYWRhYmxlLmpzIiwiZmlsdGVycy90cnVuY2F0ZV9jaGFyYWN0ZXJzLmpzIiwiZmlsdGVycy90cnVuY2F0ZV93b3Jkcy5qcyIsImZpbHRlcnMvdHJ1c3RfaHRtbC5qcyIsImZpbHRlcnMvdWNmaXJzdC5qcyIsInNlcnZpY2VzL2RpYWxvZy5qcyIsInNlcnZpY2VzL3RvYXN0LmpzIiwiYXBwL2RpYWxvZ3MvZGlhbG9ncy5qcyIsImFwcC9lbGl4aXIvZWxpeGlyLmpzIiwiYXBwL2dlbmVyYXRvcnMvZ2VuZXJhdG9ycy5qcyIsImFwcC9ob21lL2hvbWUuanMiLCJhcHAvand0X2F1dGgvand0X2F1dGguanMiLCJhcHAvbGFuZGluZy9sYW5kaW5nLmpzIiwiYXBwL2xvZ2luL2xvZ2luLmpzIiwiYXBwL21pc2MvbWlzYy5qcyIsImFwcC9yZWdpc3Rlci9yZWdpc3Rlci5qcyIsImFwcC9yZXN0X2FwaS9yZXN0X2FwaS5qcyIsImFwcC9yaWdodGJhci9yaWdodGJhci5qcyIsImFwcC9zaWRlYmFyL3NpZGViYXIuanMiLCJhcHAvdGFicy90YWJzLmpzIiwiYXBwL2hlYWRlci9oZWFkZXIuanMiLCJhcHAvdW5zdXBwb3J0ZWRfYnJvd3Nlci91bnN1cHBvcnRlZF9icm93c2VyLmpzIiwiYXBwL3RvYXN0cy90b2FzdHMuanMiLCJkaWFsb2dzL2FkZF91c2Vycy9hZGRfdXNlcnMuanMiLCJkaXJlY3RpdmVzL2RhdGFfbGlzdGluZy9kYXRhX2xpc3RpbmcuanMiLCJkaXJlY3RpdmVzL2RhdGFfbGlzdGluZy9kZWZpbml0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsVUFBQTtDQUNBOztDQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7OztDQUlBLFFBQUEsT0FBQSxjQUFBLENBQUEsYUFBQSxhQUFBO0NBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsYUFBQSxjQUFBLGFBQUEsZUFBQSxhQUFBLHNCQUFBLGFBQUE7Q0FDQSxRQUFBLE9BQUEsZUFBQTtDQUNBLFFBQUEsT0FBQSxnQkFBQSxDQUFBLGFBQUEsYUFBQTtDQUNBLFFBQUEsT0FBQSxrQkFBQTtDQUNBLFFBQUEsT0FBQSxjQUFBOzs7QUNuQkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsZ0RBQUEsVUFBQSxnQkFBQSxvQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxpQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxVQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTs7O2FBR0EsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxVQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7O2FBSUEsTUFBQSxhQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQTtvQkFDQSxVQUFBOztnQkFFQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7Ozs7Ozs7Ozs7O2FBYUEsTUFBQSxlQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTs7OzthQUlBLE1BQUEsWUFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUEsQ0FBQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7YUFJQSxNQUFBLGNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBLENBQUEsVUFBQTtnQkFDQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7O2FBSUEsTUFBQSxhQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUEsQ0FBQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7YUFJQSxNQUFBLGVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBLENBQUEsVUFBQTtnQkFDQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7O2FBSUEsTUFBQSxrQkFBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUEsQ0FBQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7YUFJQSxNQUFBLGdCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTs7OzthQUlBLE1BQUEsY0FBQTtnQkFDQSxLQUFBO2dCQUNBLE1BQUEsQ0FBQSxVQUFBO2dCQUNBLE9BQUE7b0JBQ0EsU0FBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7YUFJQSxNQUFBLGdCQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTs7OzthQUlBLE1BQUEsMkJBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxNQUFBLENBQUEsVUFBQTtnQkFDQSxPQUFBO29CQUNBLFNBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7O2FBSUEsTUFBQSxZQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsTUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxTQUFBO3dCQUNBLGFBQUEsUUFBQTs7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QSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsZUFBQSxRQUFBLHNCQUFBLFVBQUEsTUFBQTtFQUNBLE9BQUEsVUFBQSxNQUFBO0dBQ0EsT0FBQSxLQUFBLFlBQUE7Ozs7QUNMQSxDQUFBLFVBQUE7Q0FDQTs7Q0FFQSxRQUFBLE9BQUEsZUFBQSxPQUFBLFdBQUEsV0FBQTtFQUNBLE9BQUEsVUFBQSxRQUFBO0dBQ0EsS0FBQSxDQUFBLE9BQUE7SUFDQSxPQUFBOztHQUVBLE9BQUEsTUFBQSxVQUFBLEdBQUEsR0FBQSxnQkFBQSxNQUFBLFVBQUE7Ozs7OztBQ1JBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLCtCQUFBLFNBQUEsVUFBQTs7RUFFQSxPQUFBO0dBQ0EsY0FBQSxTQUFBLFVBQUEsT0FBQTs7SUFFQSxJQUFBLFVBQUE7S0FDQSxhQUFBLHFCQUFBLFdBQUEsTUFBQSxXQUFBOzs7SUFHQSxJQUFBLE9BQUE7S0FDQSxRQUFBLFFBQUEsT0FBQTs7O0lBR0EsT0FBQSxVQUFBLEtBQUE7OztHQUdBLE1BQUEsVUFBQTtJQUNBLE9BQUEsVUFBQTs7O0dBR0EsT0FBQSxTQUFBLE9BQUEsUUFBQTtJQUNBLFVBQUE7S0FDQSxVQUFBO09BQ0EsTUFBQTtPQUNBLFFBQUE7T0FDQSxHQUFBOzs7O0dBSUEsU0FBQSxTQUFBLE9BQUEsU0FBQTtJQUNBLE9BQUEsVUFBQTtLQUNBLFVBQUE7T0FDQSxNQUFBO09BQ0EsUUFBQTtPQUNBLEdBQUE7T0FDQSxPQUFBOzs7Ozs7QUN0Q0EsQ0FBQSxVQUFBO0NBQ0E7O0NBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsNkJBQUEsU0FBQSxTQUFBOztFQUVBLElBQUEsUUFBQTtHQUNBLFdBQUE7R0FDQSxTQUFBOztFQUVBLE9BQUE7R0FDQSxNQUFBLFNBQUEsUUFBQTtJQUNBLElBQUEsQ0FBQSxRQUFBO0tBQ0EsT0FBQTs7O0lBR0EsT0FBQSxTQUFBO0tBQ0EsU0FBQTtPQUNBLFFBQUE7T0FDQSxTQUFBO09BQ0EsT0FBQTtPQUNBLFVBQUE7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QUFBO1NBQ0EsY0FBQTs7Ozs7OztBQ1hBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsUUFBQSxvQkFBQSxZQUFBLG1CQUFBLFVBQUE7Ozs7OztBQ0hBLENBQUEsVUFBQTtDQUNBOztDQUVBLFFBQUEsT0FBQSxrQkFBQSxXQUFBLGVBQUEsV0FBQTs7RUFFQSxPQUFBO0dBQ0EsVUFBQTtHQUNBLGFBQUE7R0FDQSxZQUFBO0dBQ0EsTUFBQSxVQUFBLE9BQUEsU0FBQSxPQUFBOzs7Ozs7OztBQVFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHR2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcblx0XHRbXHJcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcclxuXHRcdCdhcHAuZmlsdGVycycsXHJcblx0XHQnYXBwLnNlcnZpY2VzJyxcclxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXHJcblx0XHQnYXBwLnJvdXRlcycsXHJcblx0XHQnYXBwLmNvbmZpZydcclxuXHRcdF0pO1xyXG5cclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAnc2F0ZWxsaXplciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInLCAnbmdNZEljb25zJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCduZ01lc3NhZ2VzJywndmFsaWRhdGlvbi5tYXRjaCddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdyZXN0YW5ndWxhciddKTtcclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uICh2aWV3TmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJy4vdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3NpZGViYXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdoZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRiYXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3JpZ2h0YmFyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHt9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlTmFtZTogJ0hvbWUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdob21lJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmxvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlTmFtZTogJ0xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbG9naW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8uc3RhdGUoJ2FwcC5sYW5kaW5nJywge1xyXG4gICAgICAgICAgICAvLyAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgLy8gICAgZGF0YToge3BhZ2VOYW1lOiAnT3ZlcnZpZXcnfSxcclxuICAgICAgICAgICAgLy8gICAgdmlld3M6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICdtYWluQCc6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5pbnN0YWxsJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luc3RhbGwnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3BhZ2VOYW1lOiAnSW5zdGFsbCd9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdpbnN0YWxsJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLnRhYnMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvZmVhdHVyZXMnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3BhZ2VOYW1lOiAnRmVhdHVyZXMnfSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndGFicycpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5kZXBsb3knLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGVwbG95JyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtwYWdlTmFtZTogJ0RlcGxveSd9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkZXBsb3knKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAudGhlbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvdGhlbWUnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3BhZ2VOYW1lOiAnVGhlbWUnfSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndGhlbWUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAudG9hc3RzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3RvYXN0cycsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7cGFnZU5hbWU6ICdUb2FzdHMnfSxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21haW5AJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygndG9hc3RzJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmRpYWxvZ3MnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGlhbG9ncycsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7cGFnZU5hbWU6ICdEaWFsb2dzJ30sXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2RpYWxvZ3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAuZ2VuZXJhdG9ycycsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9nZW5lcmF0b3JzJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtwYWdlTmFtZTogJ0FydGlzYW4gZ2VuZXJhdG9ycyd9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdnZW5lcmF0b3JzJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmp3dF9hdXRoJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2p3dF9hdXRoJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtwYWdlTmFtZTogJ0pTT04gV2ViIFRva2VuIEF1dGhlbnRpY2F0aW9uJ30sXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2p3dF9hdXRoJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLmVsaXhpcicsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9lbGl4aXInLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3BhZ2VOYW1lOiAnRWxpeGlyJ30sXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2VsaXhpcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC5yZXN0X2FwaScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9yZXN0X2FwaScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7cGFnZU5hbWU6ICdSRVNUIEFQSSd9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdyZXN0X2FwaScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2FwcC51bnN1cHBvcnRlZF9icm93c2VyJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3Vuc3VwcG9ydGVkX2Jyb3dzZXInLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3BhZ2VOYW1lOiAnVW5zdXBwb3J0ZWQgQnJvd3Nlcid9LFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAnbWFpbkAnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCd1bnN1cHBvcnRlZF9icm93c2VyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwLm1pc2MnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvbWlzYycsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7cGFnZU5hbWU6ICdNaXNjZWxsYW5lb3VzIGZlYXR1cmVzJ30sXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgICdtYWluQCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ21pc2MnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICA7XHJcblxyXG5cclxuICAgIH0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSwgJG1kU2lkZW5hdil7XHJcblx0XHQkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlKXtcclxuXHJcblx0XHRcdGlmICh0b1N0YXRlLmRhdGEgJiYgdG9TdGF0ZS5kYXRhLnBhZ2VOYW1lKXtcclxuXHRcdFx0XHQkcm9vdFNjb3BlLmN1cnJlbnRfcGFnZSA9IHRvU3RhdGUuZGF0YS5wYWdlTmFtZTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHR9KTtcclxuXHRcdCRyb290U2NvcGUuJG9uKFwiJHZpZXdDb250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlKXtcclxuXHRcdFx0d2luZG93LlByaXNtLmhpZ2hsaWdodEFsbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdWNjZXNzXCIsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlKXtcclxuXHRcdFx0JG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcclxuICAgICAgICAvLyBTYXRlbGxpemVyIGNvbmZpZ3VyYXRpb24gdGhhdCBzcGVjaWZpZXMgd2hpY2ggQVBJXHJcbiAgICAgICAgLy8gcm91dGUgdGhlIEpXVCBzaG91bGQgYmUgcmV0cmlldmVkIGZyb21cclxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvYXV0aGVudGljYXRlL2F1dGgnO1xyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uIChjZnBMb2FkaW5nQmFyUHJvdmlkZXIpe1xyXG5cdFx0Y2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gZmFsc2U7XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcclxuXHRcdFJlc3Rhbmd1bGFyUHJvdmlkZXJcclxuXHRcdC5zZXRCYXNlVXJsKCcvYXBpLycpXHJcblx0XHQuc2V0RGVmYXVsdEhlYWRlcnMoeyBhY2NlcHQ6IFwiYXBwbGljYXRpb24veC5sYXJhdmVsLnYxK2pzb25cIiB9KTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbiAoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgLyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cclxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2dyZXknKVxyXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnYmx1ZS1ncmV5JylcclxuICAgICAgICAgICAgLndhcm5QYWxldHRlKCdyZWQnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdjYXBpdGFsaXplJywgZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbihpbnB1dCwgYWxsKSB7XHJcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XHJcblx0XHRcdFx0cmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0fSkgOiAnJztcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoICdodW1hblJlYWRhYmxlJywgZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbiBodW1hbml6ZShzdHIpIHtcclxuXHRcdFx0aWYgKCAhc3RyICl7XHJcblx0XHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBmcmFncyA9IHN0ci5zcGxpdCgnXycpO1xyXG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8ZnJhZ3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRmcmFnc1tpXSA9IGZyYWdzW2ldLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZnJhZ3NbaV0uc2xpY2UoMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZyYWdzLmpvaW4oJyAnKTtcclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZUNoYXJhY3RlcnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgY2hhcnMsIGJyZWFrT25Xb3JkKSB7XHJcbiAgICAgICAgICAgIGlmIChpc05hTihjaGFycykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhcnMgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5sZW5ndGggPiBjaGFycykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgY2hhcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYnJlYWtPbldvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdHNwYWNlID0gaW5wdXQubGFzdEluZGV4T2YoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgbGFzdCBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0c3BhY2UgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDAsIGxhc3RzcGFjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaW5wdXQuY2hhckF0KGlucHV0Lmxlbmd0aC0xKSA9PT0gJyAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDAsIGlucHV0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dCArICcuLi4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd0cnVuY2F0ZVdvcmRzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQsIHdvcmRzKSB7XHJcbiAgICAgICAgICAgIGlmIChpc05hTih3b3JkcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod29yZHMgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0V29yZHMgPSBpbnB1dC5zcGxpdCgvXFxzKy8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0V29yZHMubGVuZ3RoID4gd29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0V29yZHMuc2xpY2UoMCwgd29yZHMpLmpvaW4oJyAnKSArICcuLi4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycpLmZpbHRlciggJ3RydXN0SHRtbCcsIGZ1bmN0aW9uKCAkc2NlICl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcclxuXHRcdFx0cmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoaHRtbCk7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnKS5maWx0ZXIoJ3VjZmlyc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiggaW5wdXQgKSB7XHJcblx0XHRcdGlmICggIWlucHV0ICl7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdEaWFsb2dTZXJ2aWNlJywgZnVuY3Rpb24oJG1kRGlhbG9nKXtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRmcm9tVGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlLCAkc2NvcGUpe1xyXG5cclxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHtcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAnLi92aWV3cy9kaWFsb2dzLycgKyB0ZW1wbGF0ZSArICcvJyArIHRlbXBsYXRlICsgJy5odG1sJ1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGlmICgkc2NvcGUpe1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5zY29wZSA9ICRzY29wZS4kbmV3KCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gJG1kRGlhbG9nLnNob3cob3B0aW9ucyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRoaWRlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHJldHVybiAkbWREaWFsb2cuaGlkZSgpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YWxlcnQ6IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KXtcclxuXHRcdFx0XHQkbWREaWFsb2cuc2hvdyhcclxuXHRcdFx0XHRcdCRtZERpYWxvZy5hbGVydCgpXHJcblx0XHRcdFx0XHRcdC50aXRsZSh0aXRsZSlcclxuXHRcdFx0XHRcdFx0LmNvbnRlbnQoY29udGVudClcclxuXHRcdFx0XHRcdFx0Lm9rKCdPaycpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGNvbmZpcm06IGZ1bmN0aW9uKHRpdGxlLCBjb250ZW50KSB7XHJcblx0XHRcdFx0cmV0dXJuICRtZERpYWxvZy5zaG93KFxyXG5cdFx0XHRcdFx0JG1kRGlhbG9nLmNvbmZpcm0oKVxyXG5cdFx0XHRcdFx0XHQudGl0bGUodGl0bGUpXHJcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXHJcblx0XHRcdFx0XHRcdC5vaygnT2snKVxyXG5cdFx0XHRcdFx0XHQuY2FuY2VsKCdDYW5jZWwnKVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ1RvYXN0U2VydmljZScsIGZ1bmN0aW9uKCRtZFRvYXN0KXtcclxuXHJcblx0XHR2YXIgZGVsYXkgPSA2MDAwLFxyXG5cdFx0XHRwb3NpdGlvbiA9ICd0b3AgcmlnaHQnLFxyXG5cdFx0XHRhY3Rpb24gPSAnT0snO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNob3c6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG5cdFx0XHRcdGlmICghY29udGVudCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gJG1kVG9hc3Quc2hvdyhcclxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXHJcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXHJcblx0XHRcdFx0XHRcdC5wb3NpdGlvbihwb3NpdGlvbilcclxuXHRcdFx0XHRcdFx0LmFjdGlvbihhY3Rpb24pXHJcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG5cdFx0XHRcdGlmICghY29udGVudCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gJG1kVG9hc3Quc2hvdyhcclxuXHRcdFx0XHRcdCRtZFRvYXN0LnNpbXBsZSgpXHJcblx0XHRcdFx0XHRcdC5jb250ZW50KGNvbnRlbnQpXHJcblx0XHRcdFx0XHRcdC5wb3NpdGlvbihwb3NpdGlvbilcclxuXHRcdFx0XHRcdFx0LnRoZW1lKCd3YXJuJylcclxuXHRcdFx0XHRcdFx0LmFjdGlvbihhY3Rpb24pXHJcblx0XHRcdFx0XHRcdC5oaWRlRGVsYXkoZGVsYXkpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdEaWFsb2dzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgRGlhbG9nU2VydmljZSkge1xyXG5cclxuXHRcdCRzY29wZS5jb25maXJtX21lc3NhZ2UgPSAnJztcclxuXHJcblx0XHQkc2NvcGUuYWxlcnREaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0RGlhbG9nU2VydmljZS5hbGVydCgnVGhpcyBpcyBhbiBhbGVydCB0aXRsZScsICdZb3UgY2FuIHNwZWNpZnkgc29tZSBkZXNjcmlwdGlvbiB0ZXh0IGluIGhlcmUuJyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5jb25maXJtRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdERpYWxvZ1NlcnZpY2UuY29uZmlybSgnVGhpcyBpcyBhIGNvbmZpcm0gdGl0bGUnLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRvIHRoaXM/JykudGhlbihcclxuXHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCRzY29wZS5jb25maXJtX21lc3NhZ2UgPSAnQ29uZmlybSBTdWNjZXNzIGNhbGxiYWNrJztcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JHNjb3BlLmNvbmZpcm1fbWVzc2FnZSA9ICdDb25maXJtIENhbmNlbCBjYWxsYmFjayc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuY3VzdG9tRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdERpYWxvZ1NlcnZpY2UuZnJvbVRlbXBsYXRlKCdhZGRfdXNlcnMnLCAkc2NvcGUpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0VsaXhpckN0cmwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0dlbmVyYXRvcnNDdHJsJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAvL1xyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdIb21lQ3RybCcsSG9tZUN0cmwpO1xyXG5cclxuICAgICBmdW5jdGlvbiBIb21lQ3RybCgpe1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0p3dEF1dGhDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkYXV0aCwgUmVzdGFuZ3VsYXIpe1xyXG5cclxuXHRcdHZhciBjcmVkZW50aWFscyA9IHt9O1xyXG5cclxuXHRcdCRzY29wZS5yZXF1ZXN0VG9rZW4gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQvLyBVc2UgU2F0ZWxsaXplcidzICRhdXRoIHNlcnZpY2UgdG8gbG9naW4gYmVjYXVzZSBpdCdsbCBhdXRvbWF0aWNhbGx5IHNhdmUgdGhlIEpXVCBpbiBsb2NhbFN0b3JhZ2VcclxuXHRcdFx0JGF1dGgubG9naW4oY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG5cdFx0XHRcdC8vIElmIGxvZ2luIGlzIHN1Y2Nlc3NmdWwsIHJlZGlyZWN0IHRvIHRoZSB1c2VycyBzdGF0ZVxyXG5cdFx0XHRcdC8vJHN0YXRlLmdvKCdkYXNoYm9hcmQnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFRoaXMgcmVxdWVzdCB3aWxsIGhpdCB0aGUgZ2V0RGF0YSBtZXRob2QgaW4gdGhlIEF1dGhlbnRpY2F0ZUNvbnRyb2xsZXJcclxuXHRcdC8vIG9uIHRoZSBMYXJhdmVsIHNpZGUgYW5kIHdpbGwgcmV0dXJuIHlvdXIgZGF0YSB0aGF0IHJlcXVpcmUgYXV0aGVudGljYXRpb25cclxuXHRcdCRzY29wZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0UmVzdGFuZ3VsYXIuYWxsKCdhdXRoZW50aWNhdGUvZGF0YScpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcclxuXHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcil7fSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMYW5kaW5nQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJG1kVG9hc3QsICRtZERpYWxvZywgJGludGVydmFsLCBUb2FzdFNlcnZpY2UsIERpYWxvZ1NlcnZpY2Upe1xyXG5cclxuXHRcdCRzY29wZS5wcm9tb0ltYWdlID0gJ2h0dHBzOi8vaS5pbWd1ci5jb20vWmJMek9QUC5qcGcnO1xyXG5cdFx0JHNjb3BlLmljb24gPSAnc2VuZCc7XHJcblxyXG5cdFx0dmFyIGljb25zID0gW1xyXG5cdFx0XHRcdCdvZmZpY2UnLCAnZmFjZWJvb2snLCAndHdpdHRlcicsICdhcHBsZScsICd3aGF0c2FwcCcsICdsaW5rZWRpbicsICd3aW5kb3dzJywgJ2FjY2Vzc2liaWxpdHknLCAnYWxhcm0nLCAnYXNwZWN0X3JhdGlvJyxcclxuXHRcdFx0XHQnYXV0b3JlbmV3JywgJ2Jvb2ttYXJrX291dGxpbmUnLCAnZGFzaGJvYXJkJywgJ2RucycsICdmYXZvcml0ZV9vdXRsaW5lJywgJ2dldF9hcHAnLCAnaGlnaGxpZ2h0X3JlbW92ZScsICdoaXN0b3J5JywgJ2xpc3QnLFxyXG5cdFx0XHRcdCdwaWN0dXJlX2luX3BpY3R1cmUnLCAncHJpbnQnLCAnc2V0dGluZ3NfZXRoZXJuZXQnLCAnc2V0dGluZ3NfcG93ZXInLCAnc2hvcHBpbmdfY2FydCcsICdzcGVsbGNoZWNrJywgJ3N3YXBfaG9yaXonLCAnc3dhcF92ZXJ0JyxcclxuXHRcdFx0XHQndGh1bWJfdXAnLCAndGh1bWJzX3VwX2Rvd24nLCAndHJhbnNsYXRlJywgJ3RyZW5kaW5nX3VwJywgJ3Zpc2liaWxpdHknLCAnd2FybmluZycsICdtaWMnLCAncGxheV9jaXJjbGVfb3V0bGluZScsICdyZXBlYXQnLFxyXG5cdFx0XHRcdCdza2lwX25leHQnLCAnY2FsbCcsICdjaGF0JywgJ2NsZWFyX2FsbCcsICdkaWFscGFkJywgJ2RuZF9vbicsICdmb3J1bScsICdsb2NhdGlvbl9vbicsICd2cG5fa2V5JywgJ2ZpbHRlcl9saXN0JywgJ2luYm94JyxcclxuXHRcdFx0XHQnbGluaycsICdyZW1vdmVfY2lyY2xlX291dGxpbmUnLCAnc2F2ZScsICd0ZXh0X2Zvcm1hdCcsICdhY2Nlc3NfdGltZScsICdhaXJwbGFuZW1vZGVfb24nLCAnYmx1ZXRvb3RoJywgJ2RhdGFfdXNhZ2UnLFxyXG5cdFx0XHRcdCdncHNfZml4ZWQnLCAnbm93X3dhbGxwYXBlcicsICdub3dfd2lkZ2V0cycsICdzdG9yYWdlJywgJ3dpZmlfdGV0aGVyaW5nJywgJ2F0dGFjaF9maWxlJywgJ2Zvcm1hdF9saW5lX3NwYWNpbmcnLFxyXG5cdFx0XHRcdCdmb3JtYXRfbGlzdF9udW1iZXJlZCcsICdmb3JtYXRfcXVvdGUnLCAndmVydGljYWxfYWxpZ25fY2VudGVyJywgJ3dyYXBfdGV4dCcsICdjbG91ZF9xdWV1ZScsICdmaWxlX2Rvd25sb2FkJywgJ2ZvbGRlcl9vcGVuJyxcclxuXHRcdFx0XHQnY2FzdCcsICdoZWFkc2V0JywgJ2tleWJvYXJkX2JhY2tzcGFjZScsICdtb3VzZScsICdzcGVha2VyJywgJ3dhdGNoJywgJ2F1ZGlvdHJhY2snLCAnZWRpdCcsICdicnVzaCcsICdsb29rcycsICdjcm9wX2ZyZWUnLFxyXG5cdFx0XHRcdCdjYW1lcmEnLCAnZmlsdGVyX3ZpbnRhZ2UnLCAnaGRyX3N0cm9uZycsICdwaG90b19jYW1lcmEnLCAnc2xpZGVzaG93JywgJ3RpbWVyJywgJ2RpcmVjdGlvbnNfYmlrZScsICdob3RlbCcsICdsb2NhbF9saWJyYXJ5JyxcclxuXHRcdFx0XHQnZGlyZWN0aW9uc193YWxrJywgJ2xvY2FsX2NhZmUnLCAnbG9jYWxfcGl6emEnLCAnbG9jYWxfZmxvcmlzdCcsICdteV9sb2NhdGlvbicsICduYXZpZ2F0aW9uJywgJ3Bpbl9kcm9wJywgJ2Fycm93X2JhY2snLCAnbWVudScsXHJcblx0XHRcdFx0J2Nsb3NlJywgJ21vcmVfaG9yaXonLCAnbW9yZV92ZXJ0JywgJ3JlZnJlc2gnLCAncGhvbmVfcGF1c2VkJywgJ3ZpYnJhdGlvbicsICdjYWtlJywgJ2dyb3VwJywgJ21vb2QnLCAncGVyc29uJyxcclxuXHRcdFx0XHQnbm90aWZpY2F0aW9uc19ub25lJywgJ3BsdXNfb25lJywgJ3NjaG9vbCcsICdzaGFyZScsICdzdGFyX291dGxpbmUnXHJcblx0XHRcdF0sXHJcblx0XHRcdGNvdW50ZXIgPSAwO1xyXG5cclxuXHRcdCRpbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUuaWNvbiA9IGljb25zWysrY291bnRlcl07XHJcblx0XHRcdGlmIChjb3VudGVyID4gMTEyKXtcclxuXHRcdFx0XHRjb3VudGVyID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMjAwMCk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJylcclxuICAgICAgICAuY29udHJvbGxlcignTG9naW5DdHJsJyxMb2dpbkN0cmwpO1xyXG5cclxuICAgICBmdW5jdGlvbiBMb2dpbkN0cmwoKXtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTWlzY0N0cmwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJylcclxuICAgICAgICAuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgUmVnaXN0ZXJDdHJsKTtcclxuXHJcbiAgICBmdW5jdGlvbiBSZWdpc3RlckN0cmwoJGF1dGgpIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID10aGlzO1xyXG4gICAgICAgIHZtLnJlZ2lzdGVyID0gcmVnaXN0ZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0ge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6dm0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDp2bS5wYXNzd29yZCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRhdXRoLnNpZ251cChjcmVkZW50aWFscykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgbG9naW4gaXMgc3VjY2Vzc2Z1bCwgcmVkaXJlY3QgdG8gdGhlIHVzZXJzIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAvLyRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUmVzdEFwaUN0cmwnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJylcclxuICAgICAgICAuY29udHJvbGxlcignUmlnaHRiYXJDdHJsJywgUmlnaHRiYXJDdHJsKTtcclxuXHJcbiAgICBmdW5jdGlvbiBSaWdodGJhckN0cmwoJG1kU2lkZW5hdiwkbG9nKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICB2bS50b2dnbGVSaWdodCA9IGJ1aWxkVG9nZ2xlcigncmlnaHQnKTtcclxuICAgICAgICB2bS5SaWdodGJhcmNsb3NlID0gUmlnaHRiYXJjbG9zZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUb2dnbGVyKG5hdklEKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkbWRTaWRlbmF2KG5hdklEKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b2dnbGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxvZy5kZWJ1ZyhcInRvZ2dsZSBcIiArIG5hdklEICsgXCIgaXMgZG9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBSaWdodGJhcmNsb3NlKCkge1xyXG5cclxuICAgICAgICAgICAgJG1kU2lkZW5hdigncmlnaHQnKS5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxvZy5kZWJ1ZyhcImNsb3NlIFJJR0hUIGlzIGRvbmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdTaWRlYmFyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlKXtcclxuXHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZEN0cmwnLCBmdW5jdGlvbigpe1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgSGVhZGVyQ29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gSGVhZGVyQ29udHJvbGxlcigkc2NvcGUsJHJvb3RTY29wZSwgJG1kU2lkZW5hdiwkbWREaWFsb2csICRsb2cpIHtcclxuXHJcbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiAodmlld05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcuL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdm0uc2hvd1JlZ2lzdGVyID0gc2hvd1JlZ2lzdGVyO1xyXG4gICAgICAgIHZtLm9wZW5TaWRlTmF2ID0gb3BlblNpZGVOYXY7XHJcbiAgICAgICAgdm0udG9nZ2xlUmlnaHQgPSB0b2dnbGVSaWdodDtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcm9vdFNjb3BlLmN1cnJlbnRfcGFnZTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAobmV3UGFnZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudF9wYWdlID0gbmV3UGFnZSB8fCAnUGFnZSBOYW1lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlblNpZGVOYXYoKSB7XHJcbiAgICAgICAgICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5vcGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVSaWdodCgpIHtcclxuICAgICAgICAgICAgJG1kU2lkZW5hdigncmlnaHQnKS5vcGVuKCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dSZWdpc3Rlcihldikge1xyXG4gICAgICAgICAgICAkbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBEaWFsb2dDdHJsLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3JlZ2lzdGVyJyksXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50OiBldixcclxuICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChhbnN3ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gJ1lvdSBzYWlkIHRoZSBpbmZvcm1hdGlvbiB3YXMgXCInICsgYW5zd2VyICsgJ1wiLic7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9ICdZb3UgY2FuY2VsbGVkIHRoZSBkaWFsb2cuJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIERpYWxvZ0N0cmwoJG1kRGlhbG9nKXtcclxuICAgICAgICAgICAgdmFyIHZtPXRoaXM7XHJcbiAgICAgICAgICAgIHZtLmhpZGU9aGlkZTtcclxuICAgICAgICAgICAgdm0uY2FuY2xlPWNhbmNsZTtcclxuICAgICAgICAgICAgdm0uYW5zd2VyPWFuc3dlcjtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgICAgICAgICAgICAgICAkbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYW5jbGUoKSB7XHJcbiAgICAgICAgICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFuc3dlcihhbnN3ZXIpIHtcclxuICAgICAgICAgICAgICAgICRtZERpYWxvZy5oaWRlKGFuc3dlcik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignVW5zdXBwb3J0ZWRCcm93c2VyQ3RybCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9cclxuICAgIH0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCl7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdUb2FzdHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBUb2FzdFNlcnZpY2Upe1xyXG5cclxuXHRcdCRzY29wZS50b2FzdFN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRUb2FzdFNlcnZpY2Uuc2hvdygnVXNlciBhZGRlZCBzdWNjZXNzZnVsbHkhJyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS50b2FzdEVycm9yID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0VG9hc3RTZXJ2aWNlLmVycm9yKCdDb25uZWN0aW9uIGludGVycnVwdGVkIScpO1xyXG5cdFx0fTtcclxuXHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdBZGRVc2Vyc0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsIERpYWxvZ1NlcnZpY2Upe1xyXG5cclxuICAgICAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKCl7XHJcblx0ICAgICAgICAvL2RvIHNvbWV0aGluZyB1c2VmdWxcclxuICAgICAgICAgICAgRGlhbG9nU2VydmljZS5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIFx0RGlhbG9nU2VydmljZS5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSggJ2FwcC5jb250cm9sbGVycycgKS5jb250cm9sbGVyKCAnRGF0YUxpc3RpbmdDdHJsJywgZnVuY3Rpb24oKXtcclxuXHRcdC8vXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpe1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnKS5kaXJlY3RpdmUoICdkYXRhTGlzdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2RpcmVjdGl2ZXMvZGF0YV9saXN0aW5nL2RhdGFfbGlzdGluZy5odG1sJyxcclxuXHRcdFx0Y29udHJvbGxlcjogJ0RhdGFMaXN0aW5nQ3RybCcsXHJcblx0XHRcdGxpbms6IGZ1bmN0aW9uKCBzY29wZSwgZWxlbWVudCwgYXR0cnMgKXtcclxuXHRcdFx0XHQvL1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
