function compareToo() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareToo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareToo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
}
function compareTo() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                console.log(modelValue);
                if (modelValue) {
                    return modelValue !== scope.otherModelValue;
                } else {
                    return true
                }
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
}
angular.module("Lms")
    .directive("compareToo", compareToo)
    .directive("compareTo", compareTo)
    .filter('truncate', function () {
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
    });
