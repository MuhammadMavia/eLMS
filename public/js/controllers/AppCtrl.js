angular.module("Lms")

    .controller('AppCtrl', ['$uibModal', '$scope', 'AccountService', appCtrl]);

function appCtrl($uibModal, $scope, AccountService) {
    $scope.signInDialog = AccountService.signInDialog;
}