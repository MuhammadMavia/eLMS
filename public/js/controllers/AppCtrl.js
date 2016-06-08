angular.module("Lms")

    .controller('AppCtrl', ['UserService', '$scope', 'AccountService', '$state', appCtrl]);

function appCtrl(UserService, $scope, AccountService, $state) {
    //$scope.signInDialog = AccountService.signInDialog;
    UserService.getCurrentUser().then(function (currentUser) {
        $scope.currentUser = currentUser;
    });
    $scope.doLogout = function () {
        localStorage.removeItem('userID');
        $state.go('lms');
        location.reload();
    }
}