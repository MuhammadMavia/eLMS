angular.module("Lms")
    .service('Cropper', function ($http, serverRef, $rootScope) {
        var scope = this;
        scope.changeProfileImg = function () {
            $mdDialog.show({
                templateUrl: "templates/cropper.html",
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                controller: 'ThemeCtrl'
            })
        };
        scope.uploadProfileImg = function (img) {
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            if (img) {
                $http.post(serverRef + '/account/updateProfileImg', {_id: loginData._id, profileImg: img}).then(
                    function (success) {
                        $mdDialog.hide();
                        $rootScope.profileImg = img;
                        Tools.showMsg('بنجاح استكمال صورة الوضع')
                    },
                    function (error) {
                        $mdDialog.hide();
                        Tools.showMsg('فشل')
                    }
                );
            }
            else {
                $mdDialog.hide();
            }
        }
    });