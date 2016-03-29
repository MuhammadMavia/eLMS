angular.module("Lms")
    .service('CheckUserRole', function () {
        this.checkUserRole = function (role) {
            var access = ['student.dashboard', 'teacher.dashboard', 'admin.dashboard'];
            return access[role - 1];
        };
    });