angular.module("Lms")
    .service('Tools', function ($mdDialog,$mdToast) {
        this.showMsg = function (msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position("top right")
                    .hideDelay(3000)
            );
        };

        this.loader = function () {
            return $mdDialog.show({
                template: "" +
                "<div style='padding: 10% 10% 10% 10%' layout='row' layout-align='center center' class='md-whiteframe-20dp'>" +
                "<md-progress-circular md-diameter='200' md-mode='indeterminate'></md-progress-circular>" +
                "</div>",
                parent: angular.element(document.body),
                // targetEvent: ev,
                clickOutsideToClose: false
            })
        }
    });