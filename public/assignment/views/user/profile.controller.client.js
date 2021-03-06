    (function (){
        'use strict';
        angular
            .module('WebAppMaker')
            .controller('ProfileController', ProfileController);


        function ProfileController(UserService, $location, $routeParams, $rootScope) {

            //View Model
            var vm =this;
            var id = $rootScope.currentUser._id;
            vm.errorMsg = null;
            vm.msg = null;
            vm.updateUser = updateUser;
            vm.logout = logout;

            function init(){
                 UserService.findUserById(id)
                     .then(function (user) {
                            vm.user = user;

                    },function (err) {
                         vm.msg = {type: 'error', text: 'User not found'};
                         console.log(err);
                     });
            }
            init();

            function updateUser(user) {
                UserService.updateUser(id,user)
                    .then(function () {
                        vm.msg = {type: 'success', text: 'Profile saved'};

                    },function () {
                        vm.msg = {type: 'error', text: 'Unable to save changes'};
                });
            }

            function logout() {
                UserService.logout()
                    .then(function () {
                        $location.url('/login');
                    });
                
            }
        }

    })();
