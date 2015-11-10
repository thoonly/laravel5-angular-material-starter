(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('HeaderCtrl', HeaderController);

    function HeaderController($scope,$rootScope, $mdSidenav,$mdDialog, $log) {

        var getView = function (viewName) {
            return './views/app/' + viewName + '/' + viewName + '.html';
        };
        var vm = this;


        vm.showRegister = showRegister;
        vm.openSideNav = openSideNav;
        vm.toggleRight = toggleRight;

        $scope.$watch(function () {
            return $rootScope.current_page;
        }, function (newPage) {
            $scope.current_page = newPage || 'Page Name';
        });

        function openSideNav() {
            $mdSidenav('left').open();
        }
        function toggleRight() {
            $mdSidenav('right').open();
        }


        function showRegister(ev) {
            $mdDialog.show({
                controller: DialogCtrl,
                templateUrl: getView('register'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        function DialogCtrl($mdDialog){
            var vm=this;
            vm.hide=hide;
            vm.cancle=cancle;
            vm.answer=answer;

            function hide() {
                $mdDialog.hide();
            }
            function cancle() {
                $mdDialog.cancel();
            }
            function answer(answer) {
                $mdDialog.hide(answer);
            }
        }
    }

})();