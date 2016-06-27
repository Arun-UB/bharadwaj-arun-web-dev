(function () {
        'use strict';
        angular
            .module('Musix')
            .controller('EditProfileController', EditProfileController);

    function EditProfileController($rootScope, $routeParams, $location, UserService) {
            var vm = this;
        var id = $routeParams.id;
            vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

            function init() {
                UserService.findUserById(id)
                    .then(function (user) {
                        vm.user = user;

                    });
            }

            init();

            function updateUser() {
                UserService.updateUser(id, vm.user)
                    .then(function () {
                        vm.msg = {type: 'success', text: 'Profile saved'};

                    }, function () {
                        vm.msg = {type: 'error', text: 'Unable to save changes'};
                    });
            }

        function deleteUser(id) {
            UserService.deleteUser(id)
                .then(function () {
                    $location.url('/admin');
                });
        }
        }
    })();
