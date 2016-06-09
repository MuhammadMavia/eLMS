angular.module("Lms")
    .service('Tools', function ($http, serverRef,$timeout) {
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
        scope.reloadAfter = function (sec) {
            $timeout(function(){location.reload()}, sec*1000);
        }

    });