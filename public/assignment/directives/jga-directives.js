(function ($) {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('draggable', draggable);

    function draggable() {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                console.log(elem);
                console.log(attr);
                $(elem).sortable(
                    {
                        axis: 'y',
                        containment: elem,
                        handle: '.glyphicon-align-justify',
                        cursor: 'move',
                        // delay: 100, // To prevent unwanted drags while clicking
                        opacity: 0.5
                    });

            }
        }
    }
})($);