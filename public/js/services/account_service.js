angular.module("Lms")
    .service('AccountService', function ($uibModal) {
        var dialog;
        this.signInDialog = function (tmp, ctrl) {
            dialog ? dialog.close() : null;
            if (tmp) {
                dialog = $uibModal.open({
                    animation: true,
                    templateUrl: tmp,
                    controller: 'AccountCtrl',
                    size: 'lg'
                });
            }
        }
    });