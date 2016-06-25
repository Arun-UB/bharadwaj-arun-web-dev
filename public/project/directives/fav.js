(function () {
    'use strict';
    angular
        .module('Musix')
        .directive('fav', fav);
    function fav() {
        return {
            restrict: 'E',
            scope: {
                id: '=',
                likes: '=',
                like: '&'
            },
            template: function (scope) {
                if (scope.likes >= 0) {
                    return '<i ng-click="scope.like(id,false)">favorite</i>';
                }
                else {
                    return '<i ng-click="scope.like(id,true)">favorite_border</i>';
                }
            }

        };
    }
})();