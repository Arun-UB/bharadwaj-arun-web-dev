(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('confirm', confirm);

    function confirm() {
        return {
            priority: 100,
            restrict: 'A',
            link: {
                pre: function (scope, element, attrs) {
                    var msg = attrs.confirm || 'Are you sure?';
                    console.log('confirm');
                    element.bind('click', function (event) {
                        if (!confirm(msg)) {
                            event.stopImmediatePropagation();
                            event.preventDefault;
                        }
                    });
                }
            }
        };
    }
})();