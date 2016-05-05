angular.module("Lms")

    .controller('AppCtrl', ['$uibModal', '$rootScope', '$scope', appCtrl]);

function appCtrl($uibModal, $rootScope, $scope) {
    var dialog;
    $rootScope.signInDialog = function (tmp, ctrl) {
        dialog ? dialog.close() : null;
        dialog = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: tmp,
            controller: 'AccountCtrl',
            size: 'lg'
        });
    };
}