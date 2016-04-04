angular.module("Lms")
    .service('CheckUserRole', function ($q, $http, serverRef, Tools, $mdDialog) {
        this.checkUserRole = function (role) {
            var access = ['student.dashboard', 'teacher.dashboard', 'admin.dashboard'];
            return access[role - 1];
        };
        this.currentUserData = function () {
            var deferred = $q.defer();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $http.get(serverRef + '/account/currentUserData?data=' + (loginData.userID || loginData.email)).then(
                function (success) {
                    console.log(success.data.user);
                    deferred.resolve(success);
                }
            );
            return deferred.promise;
        };
        this.teachersFind = function () {
            var deferred = $q.defer();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $http.get(serverRef + '/account/usersFind?data=' + 2).then(
                function (success) {
                    deferred.resolve(success);
                }
            );
            return deferred.promise;
        };
        this.studentsFind = function () {
            var deferred = $q.defer();
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $http.get(serverRef + '/account/usersFind?data=' + 1).then(
                function (success) {
                    deferred.resolve(success);
                }
            );
            return deferred.promise;
        };
        this.updateInfo = function (updatedUser) {
            Tools.loader();
            $http.post(serverRef + '/account/updateProfile', updatedUser).then(
                function (success) {
                    console.log(success);
                    if (success.data.code === 11000) {
                        Tools.showMsg("البريد الإلكتروني غير متوفر");
                    }
                    else {
                        Tools.showMsg('بنجاح تحديث ملفك الشخصي');
                        // $state.go('account.login');
                    }
                    $mdDialog.hide();
                },
                function (error) {
                    $mdDialog.hide();
                    Tools.showMsg('فشل تحديث الملف الشخصي');
                }
            );
        };
    });