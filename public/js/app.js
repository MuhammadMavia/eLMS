angular.module("Lms", ['ui.router', 'ui.bootstrap', 'firebase', 'ngMessages'])
    // .constant('serverRef', 'https://elms-serv.herokuapp.com')
    .constant('serverRef', '')
    .constant('firebaseRef', 'https://elms.firebaseio.com')
    .run(function ($rootScope, $state) {

    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('lms', {
                url: '/lms',
                templateUrl: 'templates/lms.html',
                controller: 'AppCtrl'
            })
            .state('app', {
                url: '/app',
                templateUrl: 'templates/dashboard.html',
                controller: 'AppCtrl'
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    AppContent: {
                        templateUrl: 'templates/settings.html'
                        // controller: 'AdminCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/app/settings');

    });