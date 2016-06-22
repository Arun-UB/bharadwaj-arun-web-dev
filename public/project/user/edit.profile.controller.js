(function () {
        'use strict';
        angular
            .module('Musix')
            .controller('EditProfileController', EditProfileController);

        function EditProfileController($rootScope, UserService) {
            var vm = this;
            var id = $rootScope.currentUser._id;
            vm.updateUser = updateUser;

            function init() {
                vm.user = $rootScope.currentUser;
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
        }
    })();