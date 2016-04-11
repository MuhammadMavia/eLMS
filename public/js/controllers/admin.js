angular.module("Lms")

    .controller('AdminCtrl', ['CourseService', '$scope', '$state', 'Tools', '$mdSidenav', '$location', 'firebaseRef', 'CheckUserRole', 'Cropper', admin]);

function admin(CourseService, $scope, $state, Tools, $mdSidenav, $location, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
        console.log($scope.currentUser)
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
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
    $scope.goToMyJoinedCourseDetail = function (course) {
        CourseService.selectedJoinedCourse = course;
        $scope.selectedJoinedCourse = course;
        console.log($scope.selectedJoinedCourse);
        $state.go('admin.course')
    };
    $scope.goToLessonDetailOfJoinedCourse = function (lesson) {
        CourseService.selectedLesson = lesson;
        $scope.selectedLessonOfJoinedCourse = lesson;

        // localStorage.setItem('selectedLesson', $scope.selectedLesson._id);
        // $state.go('teacher.my_created_courses')
    };
    $scope.watchVideo = function (video) {
        // $scope.selectedVideo = $scope.selectedLesson.videos[index];
        $scope.selectedVideo = video;
    };
}


