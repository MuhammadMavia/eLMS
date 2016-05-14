angular.module("Lms")

    .controller('SettingsCtrl', ['UserService', '$scope', 'Cropper', 'firebaseRef', settings]);

function settings(UserService, $scope, Cropper, firebaseRef) {
    UserService.getCurrentUser().then(function (currentUser) {
        $scope.currentUser = currentUser;
    });
    $scope.updateProfile = UserService.updateProfile;
    $scope.changePassword = UserService.changePassword;
    $scope.setPassword = UserService.setPassword;
    $scope.linkedAccount = UserService.linkedAccount;
}


