(function () {
    'use strict';

    angular
        .module('Musix')
        .controller('FollowController', FollowController);

    function FollowController($routeParams, $rootScope, UserService) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            UserService
                .getUsersFromList(id, 'followers')
                .then(function (users) {
                    vm.users = users;
                });
        }

        init();
    }
})();