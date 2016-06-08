(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('back', back);

    function back($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    };

})();