(function () {
        'use strict';
        angular
            .module('Musix')
            .controller('ProfileController', ProfileController);

        function ProfileController($location, UserService) {
            var vm = this;
            vm.logout = logout;

            function logout() {
                UserService.logout()
                    .then(function () {
                        $location.url('/login');
                    });

            }
        }
    })();