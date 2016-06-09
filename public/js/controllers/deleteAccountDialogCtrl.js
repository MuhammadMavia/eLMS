angular.module("Lms")

    .controller('DeleteAccountDialogCtrl', ['UserService', '$scope', '$http', 'serverRef', '$state', 'Tools', deleteAccountDialog]);

function deleteAccountDialog(UserService, $scope, $http, serverRef, $state, Tools) {
    $scope.doDelete = function (password) {
        UserService.deleteConfirmationDialog.close();
        console.log(UserService.userData);
        $http.post(serverRef + '/account/deleteAccount', {
            userID: UserService.userData._id,
            password: password
        }).then(
            function (success) {
                console.log(success);
                if (success.data.code == 0) {
                    toastr.error(success.data.msg)
                }
                else {
                    toastr.success('Your account successfully delete!');
                    $state.go('lms');
                    Tools.reloadAfter(1)
                }
            },
            function (err) {
                toastr.error('Failed!');
            }
        )
    }
}