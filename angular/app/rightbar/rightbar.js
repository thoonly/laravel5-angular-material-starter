(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('RightbarCtrl', RightbarCtrl);

    function RightbarCtrl($mdSidenav,$log) {
        var vm = this;
        vm.toggleRight = buildToggler('right');
        vm.Rightbarclose = Rightbarclose;

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }


        function Rightbarclose() {

            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }
    }


})();
