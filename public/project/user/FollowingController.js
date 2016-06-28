(function () {
    'use strict';

    angular
        .module('Musix')
        .controller('FollowingController', FollowingController);

    function FollowingController($routeParams, $rootScope, UserService) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            UserService
                .getUsersFromList(id, 'following')
                .then(function (users) {
                    vm.users = users;
                });
        }

        init();
    }
})();
