angular.module("Lms", ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons'])
    .constant('serverRef', 'https://elms-serv.herokuapp.com')
    // .constant('serverRef', '')
    .constant('firebaseRef', 'https://elms.firebaseio.com')
    .run(function ($rootScope, $state, Tools) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var loginData = JSON.parse(localStorage.getItem("loginData"));
            if (toState.loginCompulsory && !loginData) {
                event.preventDefault();
                $state.go("account.login")
            }
            else {
                $rootScope.myTheme = Tools.themes[loginData.theme || 0];
                if (toState.isAdmin && loginData.role !== 3) {
                    event.preventDefault();
                    $state.go("account.login")
                }
                else if (toState.isTeacher && loginData.role !== 2) {
                    event.preventDefault();
                    $state.go("account.login")
                }
                else if (toState.isStudent && loginData.role !== 1) {
                    event.preventDefault();
                    $state.go("account.login")
                }
            }
        })
    })
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
                url: '/admin',
                abstract: true,
                templateUrl: 'templates/admin.html',
                controller: 'AdminCtrl'
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/dashboard.html',
                        // controller: 'AdminCtrl'
                    }
                }
            })
            .state('admin.update_info', {
                url: '/admin_update_info',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/update_info.html',
                        // controller: 'AdminCtrl'
                    }
                }
            })
            .state('admin.add_teacher', {
                url: '/add_teacher',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/add_teacher.html',
                        controller: 'AddTeacherCtrl'
                    }
                }
            })

            /* Teacher Routes */

            .state('teacher', {
                url: '/teacher',
                // abstract: true,
                templateUrl: 'templates/teacher.html',
                controller: 'TeacherCtrl'
            })
            .state('teacher.dashboard', {
                url: '/teacher_dashboard',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/teacher_dashboard.html'
                    }
                }
            })
            .state('teacher.update_info', {
                url: '/teacher_update_info',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/update_info.html'
                    }
                }
            })
            /* Student Routes */

            .state('student', {
                url: '/student',
                // abstract: true,
                templateUrl: 'templates/student.html',
                controller: 'TeacherCtrl'
            })
            .state('student.dashboard', {
                url: '/student_dashboard',
                loginCompulsory: true,
                isStudent: true,
                views: {
                    StudentContent: {
                        templateUrl: 'templates/student_dashboard.html'
                    }
                }
            })
            .state('student.update_info', {
                url: '/student_update_info',
                loginCompulsory: true,
                isStudent: true,
                views: {
                    StudentContent: {
                        templateUrl: 'templates/update_info.html'
                    }
                }
            });

        // $urlRouterProvider.otherwise('/account/register')
        $urlRouterProvider.otherwise('/student/student_dashboard')
    });