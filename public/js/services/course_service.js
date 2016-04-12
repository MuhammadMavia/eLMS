angular.module("Lms")
    .service('CourseService', function ($q, $http, serverRef, Tools, $mdDialog) {

        var scope = this;
        scope.createCourse = function (course) {
            Tools.loader();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            course.creatorID = loginData._id;
            $http.post(serverRef + '/courses/create_course', course).then(
                function (success) {
                    $mdDialog.hide();
                    success.data.code ? Tools.showMsg('إنشاء الدورة بنجاح') : Tools.showMsg('فشل');
                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل')
                }
            )
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
            Tools.loader();
            $http.post(serverRef + '/courses/joinCourse', {courseID: courseID, userID: userID}).then(
                function (success) {
                    $mdDialog.hide();
                    success.data.code ? Tools.showMsg('انضم الدورة بنجاح') : Tools.showMsg('فشل انضم');
                    console.log(success)
                },
                function (success) {
                    console.log(success);
                    $mdDialog.hide();
                    Tools.showMsg('فشل انضم');
                }
            )
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