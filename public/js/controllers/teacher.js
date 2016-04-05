angular.module("Lms")

    .controller('TeacherCtrl', ['CourseService', '$state', '$scope', 'serverRef', 'Tools', 'LessonService', 'Cropper', 'firebaseRef', 'CheckUserRole', teacher]);

function teacher(CourseService, $state, $scope, serverRef, Tools, LessonService, Cropper, firebaseRef, CheckUserRole) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.createCourse = CourseService.createCourse;
    $scope.createLesson = LessonService.createLesson;
    $scope.updateInfo = CheckUserRole.updateInfo;
    $scope.goToCourseDetail = function (index) {
        $scope.selectedCourse = $scope.allCourses[index];
        $state.go('teacher.course_details')
    }
}


