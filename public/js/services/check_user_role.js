angular.module("Lms")
    .service('CheckUserRole', function ($q, $http, serverRef) {
        this.checkUserRole = function (role) {
            var access = ['student.dashboard', 'teacher.dashboard', 'admin.dashboard'];
            return access[role - 1];
        };
        this.currentUserData = function () {
            var deferred = $q.defer();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $http.get(serverRef + '/account/currentUserData?data=' + (loginData.userID || loginData.email)).then(
                function (success) {
                    deferred.resolve(success);
                }
            );
            return deferred.promise;
        };
    });