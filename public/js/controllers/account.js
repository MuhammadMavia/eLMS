angular.module("Lms")

    .controller('AccountCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog', '$state', 'firebaseRef', account]);

function account($http, $scope, serverRef, Tools, $mdDialog, $state, firebaseRef) {
    $scope.doLogin = function (user) {
        Tools.loader();
        $http.post(serverRef + '/account/login', user).then(
            function (success) {
                $mdDialog.hide();
                console.log(success);
                if (success.data.code === 0) {
                    Tools.showMsg(success.data.msg);
                } else {
                    Tools.showMsg("النجاح في تسجيل الدخول");
                    localStorage.setItem('loginData', JSON.stringify(success.data.user));
                    $state.go('admin');
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
    $scope.socialLogin = function () {
        var ref = new Firebase(firebaseRef);
        var socialUser = {};

        ref.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                // console.log(authData.facebook);
                socialUser.profileImg = authData.facebook.profileImageURL;
                socialUser.firstName = authData.facebook.cachedUserProfile.first_name;
                socialUser.lastName = authData.facebook.cachedUserProfile.last_name;
                socialUser.userID = authData.facebook.id;
                socialUser.link = authData.facebook.cachedUserProfile.link;
                socialUser.sex = authData.facebook.cachedUserProfile.gender;
                if (socialUser.sex == "male") {
                    socialUser.sex = 1;
                }
                else if (user.sex == "female") {
                    socialUser.sex = 2;
                }
                else {
                    socialUser.sex = 3;
                }

                $http.post(serverRef + "/account/socialUserAuth", socialUser).then(
                    function (success) {
                        Tools.showMsg("النجاح في تسجيل الدخول");
                        localStorage.setItem('loginData', JSON.stringify(success.data.user));
                        console.log(success.data.user)
                        
                    },
                    function (error) {
                        console.log(error)
                    }
                );
            }
        });
    }
}