(function () {
    'use strict';
    angular
        .module('Musix')
        .directive('profile', profile);

    function profile() {
        return {
            restrict: 'E',
            templateUrl: './templates/profile.html'
        };
    }
})();