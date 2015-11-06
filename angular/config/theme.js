(function () {
    "use strict";

    angular.module('app.config').config(function ($mdThemingProvider) {
        /* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('blue-grey')
            .warnPalette('red');

    });

})();
