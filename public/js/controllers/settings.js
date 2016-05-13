angular.module("Lms")

    .controller('SettingsCtrl', ['UserService', '$scope', 'Cropper', 'firebaseRef', settings]);

function settings(UserService, $scope, Cropper, firebaseRef) {
    UserService.getCurrentUser().then(function (currentUser) {
        $scope.currentUser = currentUser;
    })
}


