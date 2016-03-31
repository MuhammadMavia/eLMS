angular.module("Lms")

    .controller('TeacherCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog', 'Cropper', 'firebaseRef', 'CheckUserRole', teacher]);

function teacher($http, $scope, serverRef, Tools, $mdDialog, Cropper, firebaseRef, CheckUserRole) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo
}


