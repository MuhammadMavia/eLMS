angular.module("Lms")

    .controller('AccountCtrl', ['$http', '$scope', 'serverRef', '$state', 'firebaseRef', 'AccountService', account]);

function account($http, $scope, serverRef, $state, firebaseRef, AccountService) {
    $scope.signInDialog = AccountService.signInDialog;
    $scope.doLogin = function (user) {
        $http.post(serverRef + '/account/login', user).then(
            function (success) {
                if (success.data.code === 0) {
                    toastr.error('Wrong email or password!');
                } else {
                    AccountService.signInDialog();
                    localStorage.setItem('userID', success.data.user._id);
                    toastr.success('Login Successfull');
                    $state.go('app.dashboard');
                }
            },
            function (error) {
                toastr.error('Login Failed!');
                console.log(error)
            }
        );
    };
    $scope.doRegister = function (user) {
        $http.post(serverRef + '/account/signup', user).then(
            function (success) {
                if (success.data.errors) {
                    toastr.info('Email is already in use!');
                }
                else {
                    AccountService.signInDialog();
                    $state.go('app.dashboard');
                    localStorage.setItem('userID', success.data._id);
                    toastr.success('Sign in Successfull');
                }
            },
            function (error) {
                toastr.error('Sign in Failed!');
            }
        );
    };
    $scope.socialLogin = function (provider) {
        var ref = new Firebase(firebaseRef);
        var socialUser = {};
        ref.authWithOAuthPopup(provider, function (error, authData) {
            if (error) {
                toastr.error('Authentication Failed!');
            }
            else {
                socialUser.profileImg = authData[provider].profileImageURL;
                socialUser.firstName = authData[provider].cachedUserProfile.first_name || authData[provider].cachedUserProfile.given_name;
                socialUser.lastName = authData[provider].cachedUserProfile.last_name || authData[provider].cachedUserProfile.family_name;
                socialUser[provider + "ID"] = authData[provider].id;
                socialUser.role = 1;
                socialUser.email = socialUser.userID;
                $http.post(serverRef + "/account/socialUserAuth", socialUser).then(
                    function (success) {
                        console.log(success.data.user);
                        toastr.success('Sign Successfull');
                        AccountService.signInDialog();
                        $state.go('app.dashboard')
                    },
                    function (error) {
                        console.log(error);
                        toastr.error('Sign in Failed!');
                    }
                );
            }
        });
    }
}