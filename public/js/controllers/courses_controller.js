angular.module("Lms")
    .controller('CoursesCtrl', ['CourseService', '$scope', '$state', 'Tools', '$mdSidenav', 'LessonService', '$stateParams', 'CheckUserRole', 'Cropper', courses]);

function courses(CourseService, $scope, $state, Tools, $mdSidenav, LessonService, $stateParams, CheckUserRole, Cropper) {
    CourseService.findOneCourse($stateParams.courseID).then(function (course) {
        $scope.selectedCourse = course;
        $scope.selectedJoinedCourse = course;
    });
    $scope.goToLessonDetail = function (index) {
        CourseService.selectedLesson = $scope.selectedCourse.lessons[index];
        $scope.selectedLesson = $scope.selectedCourse.lessons[index];
    };
    $scope.goToLessonDetailOfJoinedCourse = function (lesson) {
        CourseService.selectedLesson = lesson;
        $scope.selectedLessonOfJoinedCourse = lesson;

        // localStorage.setItem('selectedLesson', $scope.selectedLesson._id);
        // $state.go('teacher.my_created_courses')
    };
    $scope.watchVideo = function (video) {
        // $scope.selectedVideo = $scope.selectedLesson.videos[index];
        $scope.selectedVideo = video;
    };
}