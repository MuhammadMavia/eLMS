angular.module("Lms")

    .controller('StudentCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog', '$state', 'firebaseRef', 'CheckUserRole', 'Cropper', student]);

function student($http, $scope, serverRef, Tools, $mdDialog, $state, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo;
}


