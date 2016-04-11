angular.module("Lms")

    .controller('StudentCtrl', ['CourseService', '$scope', 'serverRef', 'Tools', '$mdSidenav', '$state', 'firebaseRef', 'CheckUserRole', 'Cropper', student]);

function student(CourseService, $scope, serverRef, Tools, $mdSidenav, $state, firebaseRef, CheckUserRole, Cropper) {
    console.log($scope.currentUser);
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        console.log($scope.currentUser);
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
        // console.log(data);
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo;
    $scope.joinCourse = CourseService.joinCourse;
    $scope.fetchMyCourses = function () {
        CourseService.fetchMyCourses().then(
            function (success) {
                $scope.myCourses = success;
            }
        );
    };
    $scope.toggleSidenav = function (navId) {
        $mdSidenav(navId).toggle();
    };
    $scope.changeState = function (state) {
        $state.go(state);
    };
    $scope.goToMyJoinedCourseDetail = function (course) {
        CourseService.selectedJoinedCourse = course;
        $scope.selectedJoinedCourse = course;
        console.log($scope.selectedJoinedCourse);
        $state.go('student.course')
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


