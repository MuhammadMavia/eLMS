angular.module("Lms", ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons', 'angular-img-cropper', 'ngMessages'])
    .constant('serverRef', 'https://elms-serv.herokuapp.com')
    // .constant('serverRef', '')
    .constant('firebaseRef', 'https://elms.firebaseio.com')
    .run(function ($rootScope, $state, Tools) {
        $rootScope.yearOfStudy = ['1st Year', '2nd Year', '3rd Year', '4th Year',];
        $rootScope.categroies = ['Match', "English", "Physics", "Chemistry", "Urdu", "Arabic"];
        $rootScope.defaultProfileImg = 'https://cdnil1.fiverrcdn.com/photos/20653442/original/1449238862808_facebook20151204-17124-1d8o6tw.jpg?1449238862';
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var loginData = JSON.parse(localStorage.getItem("loginData"));
            if (toState.loginCompulsory && !loginData) {
                event.preventDefault();
                $state.go("account.login")
            }
            else if (loginData) {
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
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
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
            .state('admin.courses', {
                url: '/admin_courses',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/courses.html',
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
            .state('admin.teachers', {
                url: '/admin_teachers',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/teachers.html'
                    }
                }
            })
            .state('admin.students', {
                url: '/admin_students',
                isAdmin: true,
                loginCompulsory: true,
                views: {
                    AdminContent: {
                        templateUrl: 'templates/students.html'
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
            .state('teacher.course_details', {
                url: '/teacher_course_details',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/course_details.html'
                    }
                }
            })
            /* .state('teacher.create_lesson', {
             url: '/create_lesson',
             loginCompulsory: true,
             isTeacher: true,
             views: {
             TeacherContent: {
             templateUrl: 'templates/create_lesson.html'
             }
             }
             })*/
            .state('teacher.courses', {
                url: '/teacher_courses',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/courses.html'
                    }
                }
            })
            /*.state('teacher.create_course', {
             url: '/create_course',
             loginCompulsory: true,
             isTeacher: true,
             views: {
             TeacherContent: {
             templateUrl: 'templates/create_course.html'
             }
             }
             })*/
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
                controller: 'StudentCtrl'
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
            .state('student.courses', {
                url: '/student_courses',
                loginCompulsory: true,
                isStudent: true,
                views: {
                    StudentContent: {
                        templateUrl: 'templates/courses.html'
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

        $urlRouterProvider.otherwise('/account/login');
        /*$urlRouterProvider.otherwise('/student/student_dashboard');
         $mdThemingProvider.definePalette('md-primary', {
         '50': '000',
         '100': '000',
         '200': '000',
         '300': '000',
         '400': '000',
         '500': '000',
         '600': '000',
         '700': '000',
         '800': '000',
         '900': '000',
         'A100': '000',
         'A200': '000',
         'A400': '000',
         'A700': '000',
         'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
         // on this palette should be dark or light
         'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
         'contrastLightColors': undefined    // could also specify this if default was 'dark'
         });
         $mdThemingProvider.theme('default')
         .primaryPalette('md-primary')
         .backgroundPalette('md-primary')*/

    });