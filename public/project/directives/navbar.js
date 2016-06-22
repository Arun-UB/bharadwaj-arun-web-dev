(function () {
    'use strict';

    angular
        .module('Musix')
        .directive('navbar', navbar);

    function navbar() {
        return {
            scope: {
                'user': '=',
            },
            restrict: 'E',
            templateUrl: './templates/navbar.html'
        };
    }

})();