(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('profile', msg);

    function msg() {
        return{
            scope:{
                'id': '=',
            },
            restrict: 'E',
            templateUrl: '../templates/profile.html'
        };
    }
})();