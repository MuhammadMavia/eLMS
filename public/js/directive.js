angular.module("Lms")
    .filter('truncate', truncate)
    .filter('capitalize', function () {
        return function (input, all) {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return (!!input) ? input.replace(reg, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        }
    });

function Ctrl($scope) {
    $scope.msg = 'hello, world.';
}

function truncate() {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;


        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }

    };
}

