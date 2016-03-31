angular.module("Lms")
    .service('Tools', function ($mdDialog, $mdToast, $http, serverRef,$rootScope) {
        var scope = this;
        scope.showMsg = function (msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .hideDelay(3000)
            );
        };
        scope.loader = function () {
            return $mdDialog.show({
                template: "" +
                "<md-dialog aria-label='Loader' layout-padding layout='row' layout-align='center center' class='md-whiteframe-20dp'>" +
                "<md-progress-circular md-diameter='200' md-mode='indeterminate'></md-progress-circular>" +
                "</md-dialog>",
                parent: angular.element(document.body),
                clickOutsideToClose: false
            })
        };
        scope.themes = [
            'http://www.computer-wallpaper-backgrounds.com/wallpaper/1024x768/backgrounds/fibre-lights-orange.jpg',
            'https://lh4.googleusercontent.com/-yHeZ_0mg8cM/Trv3fogmWuI/AAAAAAAAGt4/jZM1653ELxY/bg_sun_1920x1200.resized.jpg',
            'https://evetravel.files.wordpress.com/2012/02/vapor-sea-3.jpg',
            'http://interfacelift.com/wallpaper/previews/01407_harboursunset_672x420.jpg',
            'https://lh3.googleusercontent.com/-D-7x8XAVWwE/UO5ThB_KgvI/AAAAAAAALsI/HGqvgoPGvRk/w2048-h1364/Lake%2BTahoe%2BColors.jpg',
            'https://s-media-cache-ak0.pinimg.com/736x/bc/ed/d0/bcedd0355b09b5ddfab48249cd8718a3.jpg',
            'https://lh5.ggpht.com/XTAJ29_VKGeTqmUnNA22Zu4_1PichxrGZPGiMXh-6YGmocEZ9GiMz0vhLgthkrED2A=h900',
            'https://lh3.googleusercontent.com/-fc8aYvCPIS8/Trv3ered17I/AAAAAAAAGtg/dLUU15mB3Qc/bg_afternoon_1920x1200.resized.jpg',
            'https://jamaluddinpak.files.wordpress.com/2015/04/bg_mon_1920x1200-resized.jpg',
            'https://lh3.googleusercontent.com/-od86tFafGHc/Trv3fhC1G1I/AAAAAAAAGuM/Wn3V9Up77FE/bg_thu_1920x1200.resized.jpg'
        ];
        scope.myTheme = function (index) {
            return scope.themes[index];
        };
        scope.changeTheme = function () {
            $mdDialog.show({
                templateUrl: "templates/change_theme.html",
                controller: 'ThemeCtrl',
                clickOutsideToClose: false
            })
        };
        scope.changeThemeSubmit = function (index, ok) {
            var loginData = JSON.parse(localStorage.getItem('loginData'));
            $mdDialog.hide();
            if (ok) {
                $http.post(serverRef + '/account/changeTheme', {_id: loginData._id, theme: index}).then(
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }
            else {
                $rootScope.myTheme = scope.myTheme(loginData.theme);
            }
        }
    });