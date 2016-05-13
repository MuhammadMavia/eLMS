angular.module("Lms")

    .controller('DashboardCtrl', ['$scope', 'UserService', '$state', 'firebaseRef', dashboard]);

function dashboard($scope, UserService, $state, firebaseRef) {

    UserService.getCurrentUser().then(function (currentUser) {
        $scope.currentUser = currentUser;
    })
}


