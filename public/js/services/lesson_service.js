angular.module("Lms")
    .service('LessonService', function (CourseService, $q, $http, serverRef, Tools, $mdDialog) {
        var scope = this;
        scope.createLesson = function (lesson, id) {
            lesson.courseID = id;
            Tools.loader();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            lesson.creatorID = loginData._id;
            lesson.courseID = CourseService.selectedCourse._id;
            $http.post(serverRef + '/lessons/createLesson', lesson).then(
                function (success) {
                    $mdDialog.hide();
                    success.data.code ? Tools.showMsg('إنشاء الدرس بنجاح') : Tools.showMsg('فشل');
                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل')
                }
            )
        };
        scope.pushVideo = function (video) {
            console.log(video);
            Tools.loader();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $http.post(serverRef + '/lessons/pushVideo', {video: video, lessonID: '57078835b2be3dbc008b0a5a'}).then(
                function (success) {
                    $mdDialog.hide();
                    success.data.code ? Tools.showMsg('') : Tools.showMsg('');
                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل')
                }
            )
        };
    });