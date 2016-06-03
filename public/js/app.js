angular.module("Lms", ['ui.router', 'ui.bootstrap', 'firebase', 'ngMessages'])
     .constant('serverRef', 'https://elms-serv.herokuapp.com')
    //.constant('serverRef', '')
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
                //url: '/app',
                templateUrl: 'templates/app.html',
                controller: 'AppCtrl'
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    AppContent: {
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    AppContent: {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.subject', {
                url: '/subject',
                views: {
                    AppContent: {
                        templateUrl: 'templates/subjects.html',
                        //controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.course', {
                url: '/course',
                views: {
                    AppContent: {
                        templateUrl: 'templates/course.html',
                        //controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.topics', {
                url: '/topics',
                views: {
                    AppContent: {
                        templateUrl: 'templates/topics.html',
                        //controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.subtopics', {
                url: '/subtopics',
                views: {
                    AppContent: {
                        templateUrl: 'templates/subtopics.html',
                        //controller: 'DashboardCtrl'
                    }
                }
            })
            .state('app.video', {
                url: '/video',
                views: {
                    AppContent: {
                        templateUrl: 'templates/video.html',
                        //controller: 'DashboardCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/lms');
        //$urlRouterProvider.otherwise('/settings');
        //$urlRouterProvider.otherwise('/subject');

    });