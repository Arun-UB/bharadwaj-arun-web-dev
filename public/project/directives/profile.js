(function () {
    'use strict';
    angular
        .module('Musix')
        .directive('profile', msg);

    function msg() {
        return {
            restrict: 'E',
            templateUrl: './templates/profile.html'
        };
    }
})();