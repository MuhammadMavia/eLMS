angular.module("Lms")

    .controller('AccountCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog', '$state', 'firebaseRef', 'CheckUserRole', account]);

function account($http, $scope, serverRef, Tools, $mdDialog, $state, firebaseRef, CheckUserRole) {
    $scope.doLogin = function (user) {
        Tools.loader();
        $http.post(serverRef + '/account/login', user).then(
            function (success) {
                $mdDialog.hide();
                if (success.data.code === 0) {
                    Tools.showMsg(success.data.msg);
                } else {
                    Tools.showMsg("النجاح في تسجيل الدخول");
                    localStorage.setItem('loginData', JSON.stringify(success.data.user));
                    $state.go(CheckUserRole.checkUserRole(success.data.user.role));
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
        Tools.loader();
        $http.post(serverRef + '/account/signup', user).then(
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
    };
    $scope.socialLogin = function (provider) {
        var ref = new Firebase(firebaseRef);
        var socialUser = {};
        ref.authWithOAuthPopup(provider, function (error, authData) {
            if (error) {
                Tools.showMsg("فشل تسجيل الدخول");
            }
            else {
                socialUser.profileImg = authData[provider].profileImageURL;
                socialUser.firstName = authData[provider].cachedUserProfile.first_name || authData[provider].cachedUserProfile.given_name;
                socialUser.lastName = authData[provider].cachedUserProfile.last_name || authData[provider].cachedUserProfile.family_name;
                socialUser.userID = authData[provider].id;
                socialUser.role = 1;
                socialUser.email = socialUser.userID;
                socialUser.link = authData[provider].cachedUserProfile.link;
                socialUser.sex = ['male', 'female'].indexOf(authData[provider].cachedUserProfile.gender);
                socialUser.sex === -1 ? socialUser.sex = 3 : ++socialUser.sex;
                $http.post(serverRef + "/account/socialUserAuth", socialUser).then(
                    function (success) {
                        Tools.showMsg("النجاح في تسجيل الدخول");
                        localStorage.setItem('loginData', JSON.stringify(success.data.user));
                        console.log(success.data.user);
                        $state.go('student.dashboard')

                    },
                    function (error) {
                        Tools.showMsg("فشل تسجيل الدخول");
                        console.log(error)
                    }
                );
            }
        });
    }
}