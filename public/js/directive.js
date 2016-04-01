function compareToo() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareToo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareToo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
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
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                console.log(modelValue);
                if(modelValue) {
                    return modelValue !== scope.otherModelValue;
                } else {
                    return true
                }
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}
angular.module("Lms")
    .directive("compareToo", compareToo)
    .directive("compareTo", compareTo);