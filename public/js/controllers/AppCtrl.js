angular.module("Lms")

    .controller('AppCtrl', ['UserService', '$scope', 'AccountService', appCtrl]);

function appCtrl(UserService, $scope, AccountService) {
    $scope.signInDialog = AccountService.signInDialog;
    UserService.getCurrentUser().then(function (currentUser) {
        $scope.currentUser = currentUser;
    })
}