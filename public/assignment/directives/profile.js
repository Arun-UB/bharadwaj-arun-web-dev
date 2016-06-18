(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('profile', msg);

    function msg() {
        return{
            restrict: 'E',
            templateUrl: './templates/profile.html'
        };
    }
})();