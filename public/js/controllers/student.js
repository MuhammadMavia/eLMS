angular.module("Lms")

    .controller('StudentCtrl', ['CourseService', '$scope', 'serverRef', 'Tools', '$mdDialog', '$state', 'firebaseRef', 'CheckUserRole', 'Cropper', student]);

function student(CourseService, $scope, serverRef, Tools, $mdDialog, $state, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    CourseService.getAllCourses().then(function (data) {
        $scope.allCourses = data;
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
    }
}


