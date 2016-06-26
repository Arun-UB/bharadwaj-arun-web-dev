(function () {
    'use strict';
    angular
        .module('Musix')
        .directive('profileCard', profileCard);

    function profileCard() {
        return {
            scope: {
                'user': '=',
                'follow': '&',
                'logout': '&'
            },
            restrict: 'E',
            templateUrl: './templates/profile-card.html'
        };
    }
})();