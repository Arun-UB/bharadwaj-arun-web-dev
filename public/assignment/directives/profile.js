(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('msg2', msg);

    function msg() {
        return{
            scope:{
                'data': '=',
            },
            restrict: 'E',
            templateUrl: '../templates/message.html'
        }
    }
})();