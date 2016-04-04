angular.module("Lms")

    .controller('TeacherCtrl', ['CourseService', '$http', '$scope', 'serverRef', 'Tools', '$mdDialog', 'Cropper', 'firebaseRef', 'CheckUserRole', teacher]);

function teacher(CourseService, $http, $scope, serverRef, Tools, $mdDialog, Cropper, firebaseRef, CheckUserRole) {
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
    $scope.updateInfo = CheckUserRole.updateInfo;
}


