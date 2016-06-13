(function ($) {
    'use strict';
    angular
        .module('WebAppMaker')
        .directive('sortable', sortable)
        .directive('draggable', draggable);

    function sortable() {
        var start = -1;
        var end = -1;

        function linker(scope, element, attributes) {
            $(element).sortable({
                sort: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    var order = $(this).sortable('toArray');
                    end = ui.item.index();
                    scope.callback({order: order});
                }
            });
        }

        return {
            scope: {
                callback: '&'
            },
            link: linker
        };
    }

    function draggable() {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
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
        };
    }
})($);