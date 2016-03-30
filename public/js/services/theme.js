angular.module("Lms")
    .controller('ThemeCtrl', function ($http, $scope, serverRef, Tools, $rootScope, $location, firebaseRef, CheckUserRole) {
        $scope.themes = Tools.themes;
        $scope.myTheme = $rootScope.myTheme;
        $scope.changeTheme = Tools.changeTheme;
        $scope.changeThemeClick = function (index) {
            $rootScope.myTheme = Tools.myTheme(index);
            $scope.myTheme = $scope.themes[index];
        };
        $scope.changeThemeSubmit = Tools.changeThemeSubmit;
    });