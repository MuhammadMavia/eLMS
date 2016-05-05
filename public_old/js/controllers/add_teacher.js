angular.module("Lms")

    .controller('AddTeacherCtrl', ['$http', '$scope', 'serverRef', 'Tools', '$mdDialog', '$state', 'firebaseRef', addTeacher]);

function addTeacher($http, $scope, serverRef, Tools, $mdDialog, $state, firebaseRef) {
    $scope.addTeacher = function (teacher) {
        teacher.role = 2;
        Tools.loader();
        console.log(teacher);
        $http.post(serverRef + "/account/signup", teacher).then(
            function (success) {
                $mdDialog.hide();
                console.log(success);
                if (success.data.code === 11000) {
                    Tools.showMsg("البريد الإلكتروني غير متوفر");
                }
                else {
                    Tools.showMsg("الحساب المنشأ بنجاح");
                }
            },
            function (error) {
                $mdDialog.hide();
                Tools.showMsg("فشل انشاء الحساب");
                console.log(error);
            }
        )
    }
}