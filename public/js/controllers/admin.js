angular.module("Lms")

    .controller('AdminCtrl', ['CourseService', '$scope', 'serverRef', 'Tools', '$rootScope', '$location', 'firebaseRef', 'CheckUserRole', 'Cropper', admin]);

function admin(CourseService, $scope, serverRef, Tools, $rootScope, $location, firebaseRef, CheckUserRole, Cropper) {
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
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo
}

