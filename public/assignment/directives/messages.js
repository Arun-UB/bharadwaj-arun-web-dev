(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('msg', msg);

    function msg() {
        return{
            scope:{
                'data': '=',
            },
            restrict: 'E',
            templateUrl: '../templates/message.html'
        };
    }
})();