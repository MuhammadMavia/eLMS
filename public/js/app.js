angular.module("Lms", ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons'])
    // .constant('serverRef', 'https://elms-serv.herokuapp.com')
    .constant('serverRef', '')
    .constant('firebaseRef', 'https://elms.firebaseio.com')
    .run(function ($rootScope, $state) {
        $rootScope.themes = [
            'http://www.computer-wallpaper-backgrounds.com/wallpaper/1024x768/backgrounds/fibre-lights-orange.jpg',
            'https://lh3.googleusercontent.com/-fc8aYvCPIS8/Trv3ered17I/AAAAAAAAGtg/dLUU15mB3Qc/bg_afternoon_1920x1200.resized.jpg',
            'https://lh5.ggpht.com/XTAJ29_VKGeTqmUnNA22Zu4_1PichxrGZPGiMXh-6YGmocEZ9GiMz0vhLgthkrED2A=h900',
            'http://interfacelift.com/wallpaper/previews/01407_harboursunset_672x420.jpg',
            'https://jamaluddinpak.files.wordpress.com/2015/04/bg_mon_1920x1200-resized.jpg',
            'https://lh3.googleusercontent.com/-od86tFafGHc/Trv3fhC1G1I/AAAAAAAAGuM/Wn3V9Up77FE/bg_thu_1920x1200.resized.jpg',
            'https://s-media-cache-ak0.pinimg.com/736x/bc/ed/d0/bcedd0355b09b5ddfab48249cd8718a3.jpg',
            'https://lh4.googleusercontent.com/-yHeZ_0mg8cM/Trv3fogmWuI/AAAAAAAAGt4/jZM1653ELxY/bg_sun_1920x1200.resized.jpg',
            'https://evetravel.files.wordpress.com/2012/02/vapor-sea-3.jpg',
            'https://lh3.googleusercontent.com/-D-7x8XAVWwE/UO5ThB_KgvI/AAAAAAAALsI/HGqvgoPGvRk/w2048-h1364/Lake%2BTahoe%2BColors.jpg'
        ];
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var loginData = localStorage.getItem("loginData");
            if (toState.loginCompulsory && !loginData) {
                event.preventDefault();
                $state.go("account.login")
            }
            /*else if (!toState.loginCompulsory && loginData) {
                event.preventDefault();
                $state.go('admin.dashboard');
            }*/
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
            /* Admin Routes */

            .state('admin', {
                loginCompulsory: true,
                url: '/admin',
                abstract: true,
                templateUrl: 'templates/admin.html'
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                views: {
                    AdminContent: {
                        templateUrl: 'templates/dashboard.html'
                    }
                }
            })
            .state('admin.add_teacher', {
                url: '/add_teacher',
                views: {
                    AdminContent: {
                        templateUrl: 'templates/add_teacher.html'
                    }
                }
            })
            /* Teacher Routes */

            .state('teacher', {
                loginCompulsory: true,
                url: '/teacher',
                // abstract: true,
                templateUrl: 'templates/teacher.html'
            })
            .state('teacher.dashboard', {
                url: '/teacher_dashboard',
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/teacher_dashboard.html'
                    }
                }
            })
            /* Teacher Routes */

            .state('student', {
                loginCompulsory: true,
                url: '/student',
                // abstract: true,
                templateUrl: 'templates/student.html'
            })
            .state('student.dashboard', {
                url: '/student_dashboard',
                views: {
                    StudentContent: {
                        templateUrl: 'templates/student_dashboard.html'
                    }
                }
            });

        // $urlRouterProvider.otherwise('/account/register')
        $urlRouterProvider.otherwise('/student/student_dashboard')
    });