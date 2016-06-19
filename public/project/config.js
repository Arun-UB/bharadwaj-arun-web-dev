'use strict';
(function () {
    angular
        .module('Musix')
        .config(Config);
    function Config($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

    }
})();