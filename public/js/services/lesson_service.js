angular.module("Lms")
    .service('LessonService', function ($q, $http, serverRef, Tools, $mdDialog) {
        this.createLesson = function (lesson, id) {
            lesson.courseID = id;
            Tools.loader();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            lesson.creatorID = loginData._id;
            $http.post(serverRef + '/lessons/createLesson', lesson).then(
                function (success) {
                    $mdDialog.hide();
                    success.data.code ? Tools.showMsg('بالطبع خلق بنجاح') : Tools.showMsg('فشل');
                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل')
                }
            )
        };
    });