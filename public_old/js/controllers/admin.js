angular.module("Lms")

    .controller('AdminCtrl', ['CourseService', '$scope', '$state', 'Tools', '$mdSidenav', 'firebaseRef', 'CheckUserRole', 'Cropper', admin]);

function admin(CourseService, $scope, $state, Tools, $mdSidenav, firebaseRef, CheckUserRole, Cropper) {
    CheckUserRole.currentUserData().then(function (data) {
        $scope.currentUser = data.data.user;
        localStorage.setItem('loginData', JSON.stringify(data.data.user));
        console.log($scope.currentUser)
    });
    function getAllCourses() {
        CourseService.getAllCourses().then(function (data) {
            $scope.allCourses = data;
        });
    }

    var ref = new Firebase(firebaseRef);
    ref.child('events').child('onCreateCourse').on('child_added', function () {
        getAllCourses();
    });
    ref.child('events').child('onCreateCourse').on('child_changed', function () {
        getAllCourses();
    });
    CourseService.getMyCreatedCourses().then(function (data) {
        $scope.myCreatedCourses = data;
    });
    CheckUserRole.teachersFind().then(function (data) {
        $scope.teachers = data.data;
        console.log($scope.teachers)
    });
    CheckUserRole.studentsFind().then(function (data) {
        $scope.students = data.data;
        console.log($scope.students);
    });
    $scope.changeTheme = Tools.changeTheme;
    $scope.joinCourse = function (courseID, userID) {
        CourseService.joinCourse(courseID, userID).then(
            function (course) {
                $scope.currentUser.joinedCourses.push(course);
            }
        )
    };
    $scope.toggleSidenav = function (navId) {
        $mdSidenav(navId).toggle();
    };
    $scope.changeState = function (state) {
        $state.go(state);
    };
    $scope.changeProfileImg = Cropper.changeProfileImg;
    $scope.updateMyProfile = CheckUserRole.updateMyProfile;
    $scope.createCourse = function (course) {
        CourseService.createCourse(course).then(
            function (newCreatedCourse) {
                $scope.myCreatedCourses.push(newCreatedCourse);
            }
        );
    };
    $scope.goToMyCreatedCourseDetail = function (course) {
        $state.go('admin.my_created_course_details', {courseID: course._id})
    };
    $scope.goToMyJoinedCourseDetail = function (course) {
        CourseService.selectedJoinedCourse = course;
        $scope.selectedJoinedCourse = course;
        console.log($scope.selectedJoinedCourse);
        $state.go('admin.course', {courseID: course._id})
    };

}


