angular.module("Lms")

    .controller('AdminCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$rootScope', '$location', 'firebaseRef', 'CheckUserRole', admin]);

function admin($http, $scope, serverRef, Tools, $rootScope, $location, firebaseRef, CheckUserRole) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
    });
    $scope.changeTheme = Tools.changeTheme;
}


