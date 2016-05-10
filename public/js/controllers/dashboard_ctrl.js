angular.module("Lms")

    .controller('DashboardCtrl', ['$scope', 'UserService', '$state', 'firebaseRef', dashboard]);

function dashboard($scope, UserService, $state, firebaseRef) {

    $scope.data = UserService
    console.log(UserService.getCurrentUser());
}


