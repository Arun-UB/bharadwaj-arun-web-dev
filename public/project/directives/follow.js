(function () {
    'use strict';

    angular
        .module('Musix')
        .directive('follow', navbar);

    function navbar() {
        return {
            // scope:{
            //     'data': '=',
            //     'follwing':'='
            // },
            // controller: function () {
            //
            // }
            restrict: 'E',
            templateUrl: './templates/follow.html'
        };
    }

})();