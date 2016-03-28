angular.module("Lms", ['ui.router', 'ngMaterial'])
    .constant('serverRef', 'https://elms-serv.herokuapp.com')
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var loginData = localStorage.getItem("loginData");
            if (toState.loginCompulsory && !loginData) {
                event.preventDefault();
                $state.go("account.login")
            }
            else if(!toState.loginCompulsory && loginData){
                event.preventDefault();
                $state.go('dashboard');
            }
        })
    })
   /* .factory("httpInterceptor", function () {
        return {
            request: function (config) {
                var firebaseToken = localStorage.getItem("firebaseToken");
                if (firebaseToken) {
                    config.url = config.url + "?firebaseToken=" + firebaseToken;
                }
                return config;
            }
        }
    })*/
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('lms', {
                url: '/',
                templateUrl: 'templates/lms.html'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl',
                abstract: true
            })
            .state('account.login', {
                url: '/login',
                views: {
                    AccountContent: {
                        templateUrl: 'templates/login.html'
                    }
                }
            })
            .state('account.register', {
                url: '/register',
                views: {
                    AccountContent: {
                        templateUrl: 'templates/register.html'
                    }
                }
            })
            .state('dashboard', {
                loginCompulsory: true,
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html'
            });

        $urlRouterProvider.otherwise('/account/register')
    });