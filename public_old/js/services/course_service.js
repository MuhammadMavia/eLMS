angular.module("Lms")
    .service('CourseService', function ($q, $firebaseObject, $http, serverRef, Tools, $mdDialog, firebaseRef) {
        var ref = new Firebase(firebaseRef);
        var scope = this;
        var onCreateCourseVal = null;
        ref.child('events').child('onCreateCourse').once('value', function (val) {
            onCreateCourseVal = val.val()
        });
        scope.createCourse = function (course) {
            var deferred = $q.defer();
            Tools.loader();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            course.creatorID = loginData._id;
            $http.post(serverRef + '/courses/create_course', course).then(
                function (success) {
                    $mdDialog.hide();
                    if (success.data.code) {
                        deferred.resolve(success.data.course);
                        ref.child('events').child('onCreateCourse').child('change').set(++onCreateCourseVal || 1);
                        Tools.showMsg('إنشاء الدورة بنجاح');
                    }
                    else {
                        Tools.showMsg('فشل');
                    }

                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل')
                }
            );
            return deferred.promise;
        };
        scope.getAllCourses = function () {
            var deferred = $q.defer();
            $http.get(serverRef + '/courses/allCourses').then(
                function (success) {
                    deferred.resolve(success.data);
                }
            );
            return deferred.promise;
        };
        scope.getMyCreatedCourses = function () {
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            var deferred = $q.defer();
            $http.get(serverRef + '/courses/myCreatedCourses?creatorID=' + loginData._id).then(
                function (success) {
                    deferred.resolve(success.data);
                }
            );
            return deferred.promise;
        };
        scope.findOneCourse = function (courseID) {
            var deferred = $q.defer();
            $http.get(serverRef + '/courses/findOneCourse?courseID=' + courseID).then(
                function (success) {
                    deferred.resolve(success.data);
                }
            );
            return deferred.promise;
        };
        scope.findOneJoinedCourse = function (courseID) {
            var deferred = $q.defer();
            $http.get(serverRef + '/courses/findOneCourse?courseID=' + courseID).then(
                function (success) {
                    deferred.resolve(success.data);
                }
            );
            return deferred.promise;
        };
        scope.joinCourse = function (courseID, userID) {
            var deferred = $q.defer();
            Tools.loader();
            $http.post(serverRef + '/courses/joinCourse', {courseID: courseID, userID: userID}).then(
                function (success) {
                    $mdDialog.hide();
                    if (success.data.code) {
                        scope.findOneCourse(courseID).then(function (course) {
                            Tools.showMsg('انضم الدورة بنجاح');
                            deferred.resolve(course);
                        });
                    } else {
                        Tools.showMsg('فشل انضم');
                    }
                },
                function (error) {
                    console.log(error);
                    $mdDialog.hide();
                    Tools.showMsg('فشل انضم');
                }
            );
            return deferred.promise;
        };
        scope.fetchMyCourses = function (courseID) {
            var deferred = $q.defer();
            $http.get(serverRef + '/courses/myJoinedCourses?courseID=' + courseID).then(
                function (success) {
                    // console.log(success);
                    deferred.resolve(success.data);
                },
                function (err) {
                    console.log(err)
                }
            );
            return deferred.promise;
        }
    });