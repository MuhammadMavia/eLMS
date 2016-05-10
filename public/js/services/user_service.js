angular.module("Lms")
    .service('UserService', function ($http, serverRef, $q) {
        var vm = this;
        vm.userID = localStorage.getItem('userID');
        vm.getCurrentUser = function () {
            var deferred = $q.defer();
            var user = 564;
            $http.get(serverRef + '/account/currentUserData?userID=' + vm.userID).then(
                function (success) {
                    user = success.data.user;
                    deferred.resolve(user);
                }, function (err) {
                    deferred.resolve();
                }
            );
            return deferred
        }
    });