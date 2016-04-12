angular.module("Lms")

    .controller('AdminCtrl', ['CourseService', '$scope', '$state', 'Tools', '$mdSidenav', 'LessonService', 'firebaseRef', 'CheckUserRole', 'Cropper', admin]);

function admin(CourseService, $scope, $state, Tools, $mdSidenav, LessonService, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
        console.log($scope.currentUser)
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
    });
    CourseService.getMyCreatedCourses().then(function (data) {
        $scope.myCreatedCourses = data;
        // console.log(data);
    });
    CheckUserRole.teachersFind().then(function (data) {
        $scope.teachers = data.data;
        console.log($scope.teachers)
    });
    CheckUserRole.studentsFind().then(function (data) {
        $scope.students = data.data;
        console.log($scope.students);
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.joinCourse = CourseService.joinCourse;
    $scope.toggleSidenav = function (navId) {
        $mdSidenav(navId).toggle();
    };
    $scope.changeState = function (state) {
        $state.go(state);
    };
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo;
    $scope.createCourse = CourseService.createCourse;
    $scope.createLesson = LessonService.createLesson;
    $scope.goToMyCreatedCourseDetail = function (course) {
        $state.go('admin.my_created_course_details', {courseID: course._id})
    };
    $scope.goToMyJoinedCourseDetail = function (course) {
        CourseService.selectedJoinedCourse = course;
        $scope.selectedJoinedCourse = course;
        console.log($scope.selectedJoinedCourse);
        $state.go('admin.course', {courseID: course._id})
    };

}


