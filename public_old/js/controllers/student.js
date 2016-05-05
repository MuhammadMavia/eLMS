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
    $scope.updateMyProfile = CheckUserRole.updateMyProfile;
    $scope.joinCourse = function (courseID, userID) {
        CourseService.joinCourse(courseID, userID).then(
            function (course) {
                $scope.currentUser.joinedCourses.push(course);
            }
        )
    };
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
        $state.go('student.course', {courseID: course._id})
    };
}


