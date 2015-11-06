(function () {
    "use strict";

    angular
        .module('app.controllers')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($auth) {

        var vm =this;
        vm.register = register;

        function register() {

            var credentials = {
                email:vm.email,
                password:vm.password,
            };

            $auth.signup(credentials).then(function (data) {
                // If login is successful, redirect to the users state
                //$state.go('dashboard');
            });
        }


    }

})();
