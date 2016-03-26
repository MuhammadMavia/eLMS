angular.module("Lms")

    .controller('AccountCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog','$state', account]);

function account($http, $scope, serverRef, Tools, $mdDialog,$state) {
    $scope.doLogin = function (user) {
        Tools.loader();
        $http.post('/account/login', user).then(
            function (success) {
                $mdDialog.hide();
                console.log(success);
                if (success.data.code === 0) {
                    Tools.showMsg(success.data.msg);
                } else {
                    Tools.showMsg("النجاح في تسجيل الدخول");
                    localStorage.setItem('loginData', JSON.stringify(success.data.user));
                    $state.go('dashboard');
                }
            },
            function (error) {
                $mdDialog.hide();
                Tools.showMsg("فشل تسجيل الدخول");
                console.log(error)
            }
        );
    };
    $scope.doRegister = function (user) {
        $http.post('/account/signup', user).then(
            function (success) {
                $mdDialog.hide();
                console.log(success);
                if (success.data.code === 11000) {
                    Tools.showMsg("البريد الإلكتروني غير متوفر");
                }
                else {
                    Tools.showMsg("الحساب المنشأ بنجاح");
                    $state.go('account.login');
                }
            },
            function (error) {
                $mdDialog.hide();
                Tools.showMsg("فشل انشاء الحساب");
                console.log(error);
            }
        );
    }
}