angular.module("Lms")
    .service('Tools', function ($http, serverRef) {
        var scope = this;
        scope.confirmPassword = function (pass1, pass2) {
            if (pass1 == pass2) {
                return true;
            }
            else {
                toastr.error("Password don't Match!");
                return false
            }
        };

    });