angular.module("Lms")

    .controller('TeacherCtrl', ['CourseService', '$state', '$scope', '$mdSidenav', 'Tools', 'LessonService', 'Cropper', 'firebaseRef', 'CheckUserRole', teacher]);

function teacher(CourseService, $state, $scope, $mdSidenav, Tools, LessonService, Cropper, firebaseRef, CheckUserRole) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        console.log($scope.currentUser);
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
        // console.log(data);
    });
    CourseService.getMyCreatedCourses().then(function (data) {
        $scope.myCreatedCourses = data;
        // console.log(data);
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.toggleSidenav = function (navId) {
        $mdSidenav(navId).toggle();
    };
    $scope.changeState = function (state) {
        $state.go(state);
    };
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.createCourse = CourseService.createCourse;
    $scope.createLesson = LessonService.createLesson;
    $scope.joinCourse = CourseService.joinCourse;
    $scope.updateInfo = CheckUserRole.updateInfo;
    $scope.goToMyCreatedCourseDetail = function (course) {
        $state.go('teacher.my_created_course_details', {courseID: course._id})
    };
    $scope.goToMyJoinedCourseDetail = function (course) {
        $state.go('teacher.course', {courseID: course._id})
    };
}


