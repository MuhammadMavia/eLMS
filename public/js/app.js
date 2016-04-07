angular.module("Lms", ['ui.router', 'ngMaterial', 'firebase', /*'ngMdIcons',*/ 'angular-img-cropper', 'ngMessages'])
    // .constant('serverRef', 'https://elms-serv.herokuapp.com')
    .constant('serverRef', '')
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
            .state('teacher.create_lesson', {
                url: '/create_lesson',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/create_lesson.html'
                    }
                }
            })
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
            .state('teacher.create_course', {
                url: '/create_course',
                loginCompulsory: true,
                isTeacher: true,
                views: {
                    TeacherContent: {
                        templateUrl: 'templates/create_course.html'
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

    })
    .controller('AppCtrl', function ($scope) {
        console.log('AppCtrl');

        var STATUS_POLLING_INTERVAL_MILLIS = 60 * 1000; // One minute.
        signinCallback = function (result) {
            if (result.access_token) {
                var uploadVideo = new UploadVideo();
                uploadVideo.ready(result.access_token);
            }
        };
        var UploadVideo = function () {
            /**
             * The array of tags for the new YouTube video.
             *
             * @attribute tags
             * @type Array.<string>
             * @default ['google-cors-upload']
             */
            this.tags = ['youtube-cors-upload'];

            /**
             * The numeric YouTube
             * [category id](https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.videoCategories.list?part=snippet&regionCode=us).
             *
             * @attribute categoryId
             * @type number
             * @default 22
             */
            this.categoryId = 22;

            /**
             * The id of the new video.
             *
             * @attribute videoId
             * @type string
             * @default ''
             */
            this.videoId = '';

            this.uploadStartTime = 0;
        };
        UploadVideo.prototype.ready = function (accessToken) {
            this.accessToken = accessToken;
            this.gapi = gapi;
            this.authenticated = true;
            this.gapi.client.request({
                path: '/youtube/v3/channels',
                params: {
                    part: 'snippet',
                    mine: true
                },
                callback: function (response) {
                    if (response.error) {
                        console.log(response.error.message);
                    } else {
                        console.log(response.items[0].snippet);
                        $scope.channel = response.items[0].snippet;
                        $scope.$apply();
                        // $('#channel-name').text(response.items[0].snippet.title);
                        // $('#channel-thumbnail').attr('src', response.items[0].snippet.thumbnails.default.url);
                        // $('.pre-sign-in').hide();
                        // $('.post-sign-in').show();
                    }
                }.bind(this)
            });
            document.getElementById('video-uploader-button').addEventListener("click", this.handleUploadClicked.bind(this));
            // $('#button').on("click", this.handleUploadClicked.bind(this));
        };
        UploadVideo.prototype.uploadFile = function (file) {
            $scope.video.categoryId = 22;
            $scope.video.tags = ['youtube-cors-upload'];
            var metadata = {
                snippet: $scope.video,
                /*snippet: {
                 title: $('#title').val(),
                 description: $('#description').text(),
                 tags: this.tags,
                 categoryId: this.categoryId
                 },*/
                status: {
                    privacyStatus: 'public'
                    // privacyStatus: $('#privacy-status option:selected').text()
                }
            };
            var uploader = new MediaUploader({
                baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
                file: file,
                token: this.accessToken,
                metadata: metadata,
                params: {
                    part: Object.keys(metadata).join(',')
                },
                onError: function (error) {
                    console.log(error)
                }.bind(this),
                onProgress: function (data) {
                    var bytesPerSecond = data.loaded / ((Date.now() - this.uploadStartTime) / 1000);
                    $scope.onProgressData = data;
                    $scope.onProgressData.estimatedSecondsRemaining = (data.total - data.loaded) / bytesPerSecond;
                    $scope.onProgressData.bytesPerSecond = bytesPerSecond;
                    $scope.onProgressData.percentage = (data.loaded * 100) / data.total;
                    $scope.$apply();
                    /*$('#upload-progress').attr({
                     value: data.loaded,
                     max: data.total
                     });*/
                }.bind(this),
                onComplete: function (data) {
                    var uploadResponse = JSON.parse(data);
                    $scope.uploadedVideoData = {
                        title: uploadResponse.snippet.localized.title,
                        videoID: uploadResponse.id,
                        thumbnails: uploadResponse.snippet.thumbnails,
                        description: uploadResponse.snippet.localized.description
                    };
                    $scope.$apply();
                    this.videoId = uploadResponse.id;
                    this.pollForVideoStatus();
                }.bind(this)
            });
            this.uploadStartTime = Date.now();
            uploader.upload();
        };
        UploadVideo.prototype.handleUploadClicked = function () {
            var file = document.getElementById('file').files[0];
            this.uploadFile(file);
        };
        UploadVideo.prototype.pollForVideoStatus = function () {
            this.gapi.client.request({
                path: '/youtube/v3/videos',
                params: {
                    part: 'status,player',
                    id: this.videoId
                },
                callback: function (response) {
                    if (response.error) {
                        // The status polling failed.
                        console.log(response.error.message);
                        setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
                    } else {
                        var uploadStatus = response.items[0].status.uploadStatus;
                        console.log(uploadStatus);
                        switch (uploadStatus) {
                            case 'uploaded':
                                setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
                                break;
                            case 'processed':
                                break;
                            default:
                                break;
                        }
                    }
                }.bind(this)
            });
        };
    });