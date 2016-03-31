angular.module("Lms")

    .controller('AdminCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$rootScope', '$location', 'firebaseRef', 'CheckUserRole', 'Cropper', admin]);

function admin($http, $scope, serverRef, Tools, $rootScope, $location, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
        console.log($scope.currentUser)
    });
    CheckUserRole.teachersFind().then(function (data) {
        $scope.teachers = data.data;
        console.log($scope.teachers)
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateInfo = CheckUserRole.updateInfo
}


