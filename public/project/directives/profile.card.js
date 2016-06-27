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
                'following': '&',
                'logout': '&'
            },
            restrict: 'E',
            templateUrl: './templates/profile-card.html'
        };
    }
})();